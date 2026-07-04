"use client";

import { useState } from "react";
import PropTypes from "prop-types";

import { captureAnalyticsEvent } from "@/app/lib/analytics";

function ShareIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
      />
    </svg>
  );
}

function LinkIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
      />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}

export default function IssueShareActions({
  issueId,
  title,
  url,
  variant = "inline",
  shareContext = "issue_body",
}) {
  const [copied, setCopied] = useState(false);

  const trackShare = (method) => {
    captureAnalyticsEvent("newsletter_issue_shared", {
      issue_id: issueId,
      issue_title: title,
      share_method: method,
      share_url: url,
      share_context: shareContext,
    });
  };

  const copyLink = async () => {
    if (!navigator.clipboard?.writeText) return;

    await navigator.clipboard.writeText(url);
    setCopied(true);
    trackShare("copy");
    window.setTimeout(() => setCopied(false), 1800);
  };

  const shareIssue = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        trackShare("native");
        return;
      }

      await copyLink();
    } catch (error) {
      if (error?.name !== "AbortError") {
        await copyLink();
      }
    }
  };

  if (variant === "icon") {
    const buttonClass =
      "inline-flex h-6 w-6 items-center justify-center rounded-full text-[#072ac8] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#072ac8] dark:text-[#d0a215] dark:focus-visible:outline-[#d0a215]";

    return (
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={shareIssue}
          className={buttonClass}
          aria-label="Share issue"
          title="Share issue"
        >
          <ShareIcon />
        </button>
        <button
          type="button"
          onClick={copyLink}
          className={buttonClass}
          aria-label={copied ? "Copied issue link" : "Copy issue link"}
          title={copied ? "Copied" : "Copy issue link"}
        >
          {copied ? <CheckIcon /> : <LinkIcon />}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-1">
      <button
        type="button"
        onClick={shareIssue}
        className="font-supreme text-sm tracking-wide text-base-600 dark:text-base-400 hover:text-base-950 dark:hover:text-base-50 underline-offset-4 hover:underline transition-colors"
      >
        share
      </button>
      <span className="text-base-300 dark:text-base-700">/</span>
      <button
        type="button"
        onClick={copyLink}
        className="font-supreme text-sm tracking-wide text-base-600 dark:text-base-400 hover:text-base-950 dark:hover:text-base-50 underline-offset-4 hover:underline transition-colors min-w-[4.5rem]"
        aria-live="polite"
      >
        {copied ? "copied" : "copy link"}
      </button>
    </div>
  );
}

IssueShareActions.propTypes = {
  issueId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shareContext: PropTypes.string,
  variant: PropTypes.oneOf(["inline", "icon"]),
};
