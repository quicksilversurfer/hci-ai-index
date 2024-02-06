/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect, Suspense } from "react";
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

function XMarkIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-8 h-8"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

function DocumentSearch(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth=".5"
      stroke="currentColor"
      className="w-6 h-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
      />
    </svg>
  );
}

export default function CreateCollection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [paperDetails, setPaperDetails] = useState([]);

  const handleQuerySubmit = (e) => {
    handleSubmit(e); // call the original handleSubmit
    setPaperDetails([]);
    setDescription("");
    setTitle("");
  };

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

  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    isLoading,
  } = useCompletion({
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
      <form onSubmit={handleQuerySubmit} className="mb-12 mt-12">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="what do you want to learn about..."
            className="font-display bg-base-100 border placeholder-base-500 border-base-50 dark:border-base-950 dark:bg-base-900 focus:outline-none focus:ring-1 focus:ring-yellow-light dark:focus:ring-yellow rounded-md shadow-md dark:shadow-2xl text-3xl w-full bg-transparent px-4 py-4 "
          />
          <div className="absolute inset-y-1 right-0 flex pr-4">
            {input && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setInput("");
                }}
                className="inline-flex items-center cursor-pointer group"
                aria-label="Clear input"
              >
                <XMarkIcon className="text-base-500 group-hover:text-base-300 transition h-8 w-8" />
              </button>
            )}
          </div>
        </div>
      </form>
      {completion.length === 0 && (
        <div className="flex grow font-sans justify-center items-center text-center text-base-500 dark:text-base-700">
          <div className="mx-auto max-w-96 mb-24">
            <DocumentSearch className="w-16 h-16 mx-auto mb-8" />
            <div>
              <p className="text-lg mb-8 text-pretty">
                Not sure where to begin? Try one of these example queries:
              </p>
              <ul className="mb-4 space-y-6 text-pretty font-display text-lg">
                <li className="p-1 px-4 rounded-full text-base-600 dark:text-base-400 border border-base-200 dark:border-base-900 w-fit mx-auto">
                  virtual reality and cognitive load
                </li>
                <li className="p-1 px-4 rounded-full text-base-600 dark:text-base-400 border border-base-200 dark:border-base-900 w-fit mx-auto">
                  hci in healthcare: case studies
                </li>
                <li className="p-1 px-4 rounded-full text-base-600 dark:text-base-400 border border-base-200 dark:border-base-900 w-fit mx-auto">
                  impact of ai on ux
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
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
