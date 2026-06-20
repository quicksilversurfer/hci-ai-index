import clsx from "clsx";
import { useMemo } from "react";
import Image from "next/image";

const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_HCI_IMAGE_BASE_URL ??
  "https://d4409x4u6zb58.cloudfront.net/images";

function getScatterClass(uuid) {
  const positions = [
    "-translate-x-2 translate-y-6 -rotate-2",
    "translate-x-1 translate-y-3 rotate-1",
    "translate-x-2 translate-y-8 -rotate-1",
  ];
  const seed = uuid
    ? uuid.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : 0;

  return positions[seed % positions.length];
}

function BookImg({ uuid, imgName, title, variant }) {
  return (
    <div
      key={uuid}
      className={clsx(
        "relative mx-auto",
        variant === "thumbnail"
          ? clsx(
              "aspect-[3/4] w-full max-w-[13.5rem]",
              getScatterClass(uuid)
            )
          : "w-full"
      )}
    >
      <div className="relative inset-0 z-0 rounded-sm bg-[#fff] shadow-md transition duration-300 ease-in-out hover:scale-105">
        <Image
          src={`${IMAGE_BASE_URL}/${imgName}.webp`}
          alt={title}
          width={1200}
          height={1600}
          unoptimized
          className={clsx(
            "mt-0 w-full rounded-sm object-contain",
            variant === "thumbnail" ? "h-full" : "h-auto"
          )}
        />
      </div>
    </div>
  );
}

function PaperImg({ uuid, imgName, title, variant }) {
  /* Deterministic rotation based on UUID to prevent hydration mismatch */
  const coverRotation = useMemo(() => {
    const rotations = ["-rotate-1", "rotate-0", "rotate-1"];
    const seed = uuid
      ? uuid.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      : 0;

    return rotations[seed % rotations.length];
  }, [uuid]);

  const PaperDiv = ({ className }) => (
    <div
      aria-hidden="true"
      className={clsx(
        "absolute inset-0 h-full w-full origin-center rounded-sm border border-base-300 shadow-sm",
        className
      )}
    />
  );

  return (
    <div
      key={uuid}
      className={clsx(
        "relative mx-auto",
        variant === "thumbnail"
          ? clsx(
              "aspect-[3/4] w-full max-w-[13.5rem]",
              getScatterClass(uuid)
            )
          : "w-full"
      )}
    >
      <PaperDiv className="-rotate-3 translate-x-1 translate-y-2 bg-base-200" />
      <PaperDiv className="rotate-2 -translate-x-1 translate-y-1 bg-base-100" />
      <div
        className={clsx(
          "relative inset-0 z-10 h-full w-full origin-center overflow-clip rounded-sm border border-base-200 bg-[#fff] shadow-md transition duration-300 ease-in-out hover:rotate-0",
          coverRotation
        )}
      >
        <Image
          src={`${IMAGE_BASE_URL}/${imgName}.webp`}
          alt={title}
          width={1200}
          height={1600}
          unoptimized
          className={clsx(
            "mt-0 w-full rounded-sm object-contain",
            variant === "thumbnail" ? "h-full" : "h-auto"
          )}
        />
      </div>
    </div>
  );
}

export default function PaperImage({ uuid, type, imgName, title, className, variant = "thumbnail" }) {
  return (
    <div
      className={clsx(
        "relative w-full max-w-lg self-center",
        variant === "thumbnail" && "-mb-8 h-72",
        className
      )}
    >
      {type === "book" && (
        <BookImg uuid={uuid} imgName={imgName} title={title} variant={variant} />
      )}
      {type === "paper" && (
        <PaperImg uuid={uuid} imgName={imgName} title={title} variant={variant} />
      )}
    </div>
  );
}
