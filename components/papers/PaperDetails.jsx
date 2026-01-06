'use client';

import { useRef } from 'react';
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

import PaperImage from "@/components/papers/PaperImage";
import TextSelectionShare from "@/components/ui/TextSelectionShare";

function ArrowIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
}
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

function PaperExpanded({
  uuid,
  link,
  imgName,
  title,
  authors,
  date,
  htmlSummary,
  imgType,
  imgId,
}) {
  const contentRef = useRef(null);

  return (
    <div key={uuid} className="flex flex-col lg:flex-row-reverse my-24 break-inside-avoid">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex lg:mx-8 mb-12 lg:mb-0 mx-auto self-center"
      >
        <div className="ml-0 lg:ml-32">
          <PaperImage
            uuid={imgId}
            type={imgType}
            imgName={imgName}
            title={title}
            variant="full"
            className="max-w-lg"
          />
        </div>
      </a>
      <div className="marker:text-base-800 dark:marker:text-base-300 grow self-center group mt-12 lg:mt-0">
        <div ref={contentRef} className="w-full lg:max-w-lg relative">
          <h3 className="mb-4 font-display font-medium text-2xl text-base-900 dark:text-base-950 3xl:mt-0 text-pretty">
            {title}
          </h3>
          <p className="mb-4 font-mono text-base text-base-950/80 py-2 mt-0">
            {authors.join(", ")} · {date}
          </p>
          <div className="text-base space-y-4">
            <div
              className="space-y-4 summary"
              dangerouslySetInnerHTML={{ __html: htmlSummary }}
            ></div>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link transition hover:ease-in duration-150 mt-8 rounded-full bg-base-950/10 px-2.5 py-1.5 shadow-sm hover:bg-base-950/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-light max-w-fit flex flex-row"
          >
            <div className="text-base-900 group-hover/link:text-base-paper font-display text-sm font-[590]">
              Read more
            </div>

            <ChevronRightIcon className="ml-1 text-base-900 w-3 h-3 mt-1 group-hover/link:text-base-paper" />
          </a>
          <TextSelectionShare targetRef={contentRef} paperTitle={title} />
        </div>
      </div>
    </div>
  );
}

function PaperOverview({ title, authors, date }) {
  return (
    <div className="flex flex-col grow pr-4 break-after-auto">
      <h3 className="font-display font-medium leading-snug text-body-base text-base-900 dark:text-base-paper 3xl:mt-0 text-pretty lowercase group-hover:text-[#072ac8] dark:group-hover:text-[#d0a215] transition duration-700">
        {title}
      </h3>
      <div className="mb-4 flex justify-between font-mono text-body-intermediate font-regular py-1">
        <p className="mt-0 mb-0 text-base-800 dark:text-base-300">
          {authors.join(", ")} · {date}
        </p>
      </div>
    </div>
  );
}

/**
 * @prop {string} uuid - The unique identifier of the paper.
 * @prop {string} link - The URL link to the paper.
 * @prop {string} imgName - The name of the image associated with the paper.
 * @prop {string} title - The title of the paper.
 * @prop {Array} authors - The authors of the paper.
 * @prop {string} date - The publication date of the paper.
 * @prop {string} summary - The summary of the paper.
 * @prop {string} imgType - The type of the image associated with the paper.
 * @prop {string} imgId - The unique identifier of the image associated with the paper.
 */

export default function PaperDetails({
  uuid,
  link,
  imgName,
  title,
  authors,
  date,
  summary,
  imgType,
  imgId,
}) {
  if (imgName === undefined) {
    return (
      <a
        key={uuid}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex flex-row break-inside-avoid"
      >
        <PaperOverview title={title} authors={authors} date={date} />
        <span className="mt-1 text-[#072ac8] dark:text-[#d0a215] transition duration-700 opacity-0 group-hover:opacity-80 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
          <ArrowIcon />
        </span>
      </a>
    );
  }
  const htmlSummary = DOMPurify.sanitize(marked.parse(summary));
  return (
    <PaperExpanded
      key={uuid}
      link={link}
      imgName={imgName}
      title={title}
      authors={authors}
      date={date}
      htmlSummary={htmlSummary}
      imgType={imgType}
      imgId={imgId}
    />
  );
}
