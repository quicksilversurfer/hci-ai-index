"use client";

import PropTypes from "prop-types";

export function ChevronLeftIcon({ className, strokeWidth = 2 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
            />
        </svg>
    );
}

ChevronLeftIcon.propTypes = {
    className: PropTypes.string,
    strokeWidth: PropTypes.number,
};

export function ChevronRightIcon({ className, strokeWidth = 2 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
        </svg>
    );
}

ChevronRightIcon.propTypes = {
    className: PropTypes.string,
    strokeWidth: PropTypes.number,
};

export default function ArrowButton({ direction, onClick, disabled, className }) {
    const isLeft = direction === "left";
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(34,34,34,0.18)] bg-[linear-gradient(180deg,_#ffffff_0%,_#f5f5f5_100%)] text-base-900 shadow-paper-soft transition-all duration-200 hover:border-[rgba(34,34,34,0.45)] hover:bg-[linear-gradient(180deg,_#f7f7f7_0%,_#ebebeb_100%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flexoki-base-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-[rgba(255,255,255,0.12)] dark:bg-[linear-gradient(180deg,_#262524_0%,_#161513_100%)] dark:text-base-100 dark:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.35)] dark:hover:border-[rgba(0,0,0,0.3)] dark:hover:bg-[linear-gradient(180deg,_#1f1e1d_0%,_#141312_100%)] ${className || ""}`}
            aria-label={isLeft ? "Previous" : "Next"}
        >
            {isLeft ? (
                <ChevronLeftIcon className="h-4 w-4 text-base-500 dark:text-flexoki-base-400" />
            ) : (
                <ChevronRightIcon className="h-4 w-4 text-base-500 dark:text-flexoki-base-400" />
            )}
        </button>
    );
}

ArrowButton.propTypes = {
    direction: PropTypes.oneOf(["left", "right"]).isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};
