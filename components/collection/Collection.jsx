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
        "group/collection max-w-full rounded-lg overflow-hidden border-b border-b-base-900/20 relative",
        { "h-full max-h-[28rem]": variant === "overview" }
      )}
    >
      <div className="relative w-full sm:w-fit after:hidden sm:after:block after:bg-yellow-light dark:after:bg-yellow after:top-0 after:h-full after:rounded-t-md after:w-8 after:absolute after:-right-4 after:skew-x-[30deg]">
        <h3 className="bg-yellow-light dark:bg-yellow h-full pt-4 px-6 rounded-t-md uppercase font-mono text-base-950">
          {variant === "generated" ? "Generated" : category} /
        </h3>
      </div>
      <div className="bg-yellow-light dark:bg-yellow rounded-md rounded-tr-none sm:rounded-tr-md rounded-tl-none pt-4 h-full">
        <div
          className={clsx(
            "bg-gradient-to-b from-transparent to-90%  text-base-900 w-full pb-24",
            variant === "overview" ? "to-base-900/25" : "to-base-900/5"
          )}
        >
          <div
            className={clsx("max-w-screen-xl", {
              "mt-32 mx-auto": variant === "generated" || variant === "details",
            })}
          >
            <div className="px-6 relative flex flex-col">
              <h2
                className={clsx(
                  "lowercase text-pretty font-display font-medium",
                  variant === "overview"
                    ? "text-2xl mt-4 mb-2"
                    : "text-4xl tracking-tight mb-8"
                )}
              >
                {title}
              </h2>
              <p
                className={clsx(
                  "text-pretty font-sans",
                  variant === "overview"
                    ? "text-base max-w-prose line-clamp-3"
                    : "text-lg font-sans mt-6 whitespace-pre-line w-full lg:columns-2"
                )}
              >
                {description}
              </p>
            </div>

            <div className="mt-10 px-6 font-sans">
              {variant === "overview" && (
                <div className="flex flex-col sm:flex-row space-x-4">
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

      <span className="absolute right-0 top-0 text-[#072ac8] dark:text-[#d0a215] transition duration-700 opacity-0 group-hover/collection:opacity-80 -translate-x-1 translate-y-1 group-hover/collection:translate-x-0 group-hover/collection:translate-y-0">
        {variant === "overview" ? (
          <ArrowIcon />
        ) : (
          <Link href="/">
            <CloseIcon />
          </Link>
        )}
      </span>
    </article>
  );
}
