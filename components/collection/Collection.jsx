import clsx from "clsx";
import Link from "next/link";

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
function CloseIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
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

/**
 * @prop {string} uuid - The id of the collection.
 * @prop {string} category - The category of the collection.
 * @prop {string} title - The title of the collection.
 * @prop {string} description - The description of the collection.
 * @prop {string} variant - The variant of the collection, can be "overview", "details", or "generated".
 * @prop {ReactNode} children - The child components to be rendered within the collection.
 */

export default function Collection({
  uuid,
  category,
  title,
  description,
  variant,
  children,
}) {
  return (
    <article
      key={uuid}
      className={clsx(
        "group/collection rounded-lg max-w-full overflow-hidden relative transition-colors",
        { "h-full max-h-[28rem]": variant === "overview" }
      )}
    >
      <div className="relative w-full sm:w-fit after:hidden sm:after:block after:bg-yellow-light dark:after:bg-yellow after:top-0 after:h-full after:rounded-t-md after:w-8 after:absolute after:-right-4 after:skew-x-[30deg]">
        <h3 className="bg-yellow-light dark:bg-yellow h-full pt-4 px-6 rounded-t-md uppercase font-mono text-base-950 text-base">
          {variant === "generated" ? "Generated" : category} /
        </h3>
      </div>
      <div className="bg-yellow-light dark:bg-yellow rounded-md rounded-tr-none sm:rounded-tr-md rounded-tl-none pt-4 h-full">
        <div
          className={clsx(
            "text-base-900 w-full",
            variant === "overview" ? "pb-rhythm-4" : "pt-24 pb-24"
          )}
        >
          <div className="w-full max-w-screen-xl mx-auto">
            <div className="px-6 pt-rhythm-2 relative flex flex-col gap-rhythm-2">
              <h2
                className={clsx(
                  "lowercase text-pretty font-display font-medium text-base-900",
                  variant === "overview"
                    ? "text-2xl"
                    : "text-4xl leading-tight mb-8"
                )}
              >
                {title}
              </h2>
              <p
                className={clsx(
                  "text-pretty font-sans text-base-900",
                  variant === "overview"
                    ? "text-base line-clamp-3 max-w-reading"
                    : "text-lg font-sans whitespace-pre-line lg:columns-2 gap-12"
                )}
              >
                {description}
              </p>
            </div>

            <div className="mt-rhythm-3 px-6 font-sans">
              {variant === "overview" && (
                <div className="flex flex-col sm:flex-row gap-rhythm-2">
                  {children}
                </div>
              )}
              {(variant === "details" || variant === "generated") && (
                <>{children}</>
              )}
            </div>
          </div>
        </div>
      </div>

      <span className="hidden sm:block absolute right-0 top-0 text-[#072ac8] dark:text-[#d0a215] transition duration-700 opacity-0 group-hover/collection:opacity-80 -translate-x-1 translate-y-1 group-hover/collection:translate-x-0 group-hover/collection:translate-y-0">
        {variant === "overview" && <ArrowIcon />}
      </span>
    </article>
  );
}
