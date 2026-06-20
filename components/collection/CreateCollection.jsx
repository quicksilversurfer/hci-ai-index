"use client";

import { useState } from "react";

import Collection from "@/components/collection/Collection";
import PaperDetails from "@/components/papers/PaperDetails";

function XMarkIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-8 w-8"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
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
      className="h-6 w-6"
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

function Spinner() {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-base-200 border-t-yellow-light dark:border-base-800 dark:border-t-yellow" />
    </div>
  );
}

function SearchErrorIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m15.5 15.5 4 4m-2-9a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const EXAMPLE_QUERIES = [
  "virtual reality and cognitive load",
  "hci in healthcare: case studies",
  "impact of ai on ux",
];

async function postJson(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `Request failed (${response.status})`);
  }

  return data;
}

export default function CreateCollection() {
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [paperDetails, setPaperDetails] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const runQuery = async (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery || isGenerating) return;

    setError("");
    setTitle("");
    setDescription("");
    setPaperDetails([]);
    setIsGenerating(true);

    try {
      const result = await postJson("/api/processCompletion", {
        query: trimmedQuery,
      });
      setTitle(result.title);
      setDescription(result.description);
      setPaperDetails([
        ...new Map(
          (result.papers ?? []).map((paper) => [paper.uuid.toLowerCase(), paper]),
        ).values(),
      ]);
    } catch (requestError) {
      console.error("Collection request failed", requestError);
      setError(requestError.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    runQuery(input);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-12 mt-12">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="what do you want to learn about..."
            className="w-full rounded-md border border-base-150 bg-base-100 bg-transparent px-4 py-4 font-display text-2xl shadow-md placeholder-base-500 focus:outline-none focus:ring-1 focus:ring-yellow-light dark:border-base-850 dark:bg-base-900 dark:shadow-2xl dark:focus:ring-yellow md:text-3xl"
          />
          <div className="absolute inset-y-1 right-0 flex pr-4">
            {input && (
              <button
                type="button"
                onClick={() => setInput("")}
                className="group inline-flex cursor-pointer items-center"
                aria-label="Clear input"
              >
                <XMarkIcon className="h-8 w-8 text-base-500 transition group-hover:text-base-300" />
              </button>
            )}
          </div>
        </div>
      </form>

      {isGenerating && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Spinner />
            <p className="mt-4 font-sans text-lg text-base-600 dark:text-base-400">
              Searching the HCI research archive...
            </p>
          </div>
        </div>
      )}

      {error && !isGenerating && (
        <div
          role="alert"
          className="mb-12 flex items-start gap-3 rounded-md bg-base-100/60 px-4 py-3 font-sans text-base-600 shadow-sm dark:bg-base-900/60 dark:text-base-400"
        >
          <SearchErrorIcon className="mt-0.5 h-5 w-5 shrink-0 opacity-70" />
          <div>
            <p className="text-base-800 dark:text-base-200">Search couldn’t finish</p>
            <p className="mt-0.5 text-sm">{error}</p>
          </div>
        </div>
      )}

      {!title && !isGenerating && (
        <div className="flex grow items-center justify-center text-center font-sans text-base-500 dark:text-base-700">
          <div className="mx-auto mb-24 max-w-96">
            <DocumentSearch className="mx-auto mb-8 h-16 w-16" />
            <p className="mb-8 text-pretty text-lg">
              Not sure where to begin? Try one of these example queries:
            </p>
            <ul className="mb-4 space-y-6 text-pretty font-display text-lg">
              {EXAMPLE_QUERIES.map((query) => (
                <li
                  key={query}
                  className="mx-auto w-fit rounded-full border border-base-200 p-1 px-4 text-base-600 transition-all hover:border-base-500 dark:border-base-900 dark:text-base-400 dark:hover:border-base-700"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setInput(query);
                      runQuery(query);
                    }}
                  >
                    {query}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {title && !isGenerating && (
        <Collection variant="generated" title={title} description={description}>
          {paperDetails.map((paper) => (
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
