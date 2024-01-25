"use client";
import { useState, useEffect, Fragment } from "react";
import { useCompletion } from "ai/react";

import Collection from "@/components/collection/Collection";
import PaperDetails from "@/components/papers/PaperDetails";

function ChevronRightIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      className="w-6 h-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

export default function CreateCollection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [matches, setMatches] = useState([]);
  const [paperDetails, setPaperDetails] = useState([]);

  const sendCompletionForProcessing = async (genTitle, genDescription) => {
    try {
      console.log("Sending completion:" + completion);
      const response = await fetch("/api/processCompletion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: genTitle, description: genDescription }),
      });

      if (!response.ok) {
        // Log response for debugging
        const errorBody = await response.text();
        console.error("Response Status:", response.status);
        console.error("Response Body:", errorBody);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      //   console.log("Server response:", responseData);
      setPaperDetails(responseData);

      // Catch errors
    } catch (error) {
      console.error("Error processing completion:", error);
    }
  };

  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: "/api/completion",
      onFinish: (prompt, completion) => {
        const titleStart = completion.indexOf("Title:");
        const descriptionStart = completion.indexOf("Description:");

        if (titleStart !== -1 && descriptionStart !== -1) {
          const titleText = completion
            .substring(titleStart + 7, descriptionStart)
            .trim();
          const descriptionText = completion
            .substring(descriptionStart + 13)
            .trim();

          sendCompletionForProcessing(titleText, descriptionText);
        }
      },
    });

  useEffect(() => {
    if (completion.length > 0) {
      const titleStart = completion.indexOf("Title:");
      const descriptionStart = completion.indexOf("Description:");

      if (titleStart !== -1 && descriptionStart !== -1) {
        const titleText = completion
          .substring(titleStart + 7, descriptionStart)
          .trim();
        const descriptionText = completion
          .substring(descriptionStart + 13)
          .trim();
        setTitle(titleText);
        setDescription(descriptionText);
      }
    }
  }, [completion]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="what do you want to learn about..."
          className="font-display bg-base-100 border placeholder-base-500 border-base-50 dark:border-base-950 dark:bg-base-900 rounded-md shadow-md dark:shadow-2xl text-3xl w-full bg-transparent px-4 py-4 mb-12 mt-8"
        />
      </form>
      {completion.length > 0 && (
        <Collection variant="generated" title={title} description={description}>
          {paperDetails.papers &&
            paperDetails.papers.length > 0 &&
            paperDetails.papers.map((paper) => (
              <PaperDetails
                key={paper.uuid}
                imgId={paper.uuid}
                title={paper.title}
                imgType={paper.type}
                imgName={paper.image_name}
                authors={paper.author}
                summary={paper.summary}
                link={paper.link}
                date={paper.date}
              />
            ))}
        </Collection>
      )}
    </>
  );
}
