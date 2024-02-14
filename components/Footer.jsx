/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

function HeartIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
    </svg>
  );
}

function SparklesIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row justify-between border-t border-t-base-500 mt-24 mb-12 font-display pt-4 mx-4 sm:mx-8 2xl:mx-0">
      <div>
        <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 pb-8 sm:pb-0">
          <li>
            project by{" "}
            <a href="https://www.prateeksolanki.com/" className="link-style">
              prateek solanki
            </a>
          </li>
          <li>
            <Link href="/allWorks" className="link-style">
              all works
            </Link>
          </li>
          <li>
            <Link href="/about" className="link-style">
              about
            </Link>
          </li>
          <li>
            <Link href="/disclaimer" className="link-style">
              * disclaimer
            </Link>
          </li>
          <li>
            <a
              href="https://forms.gle/2JDfkxxqQoj3Ee4b9"
              className="link-style"
              target="_blank"
              rel="noopener noreferrer"
            >
              feedback
            </a>
          </li>
        </ul>
      </div>
      <div>
        <p className="w-fit inline-flex">
          built with{" "}
          <HeartIcon className="mt-1 ml-1 mr-1 inline-block w-4 h-4 text-red" />{" "}
          &{" "}
          <SparklesIcon className="mt-1 ml-1 inline-block w-4 h-4 text-yellow-light" />
        </p>
      </div>
    </footer>
  );
}
