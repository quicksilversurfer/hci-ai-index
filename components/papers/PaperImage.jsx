import clsx from "clsx";
import { useMemo } from "react";
import Image from "next/image";



function BookImg({ uuid, imgName, title, variant }) {
  return (
    <div key={uuid} className="relative h-full w-full">
      <div className="relative inset-0 z-0 transition duration-300 ease-in-out hover:scale-105 shadow-md bg-[#fff] rounded-sm">
        <Image
          src={`/images/${imgName}.png`}
          alt={title}
          width={500}
          height={500}
          className={clsx(
            "mt-0 rounded-sm w-full",
            variant === "thumbnail" ? "object-cover h-full" : "object-fill"
          )}
        />
      </div>
    </div>
  );
}

function PaperImg({ uuid, imgName, title, variant }) {
  /* Deterministic rotation based on UUID to prevent hydration mismatch */
  const [rotationClass1, rotationClass2, rotationClass3] = useMemo(() => {
    const rotationsBase = ["-rotate-3", "rotate-1", "rotate-3"];
    const seed = uuid ? uuid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;

    // Simple deterministic permutation based on seed
    const permutations = [
      ["-rotate-3", "rotate-1", "rotate-3"],
      ["-rotate-3", "rotate-3", "rotate-1"],
      ["rotate-1", "-rotate-3", "rotate-3"],
      ["rotate-1", "rotate-3", "-rotate-3"],
      ["rotate-3", "-rotate-3", "rotate-1"],
      ["rotate-3", "rotate-1", "-rotate-3"],
    ];

    return permutations[seed % permutations.length];
  }, [uuid]);
  const PaperDiv = ({ rotationClass, bgClass }) => (
    <div
      className={`${rotationClass} absolute h-full w-full pb-6 transform rounded-sm border border-base-200 ${bgClass} shadow-md`}
    />
  );
  return (
    <div key={uuid}>
      <PaperDiv rotationClass={rotationClass1} bgClass="bg-base-200" />
      <PaperDiv rotationClass={rotationClass2} bgClass="bg-base-100" />
      <div
        className={`${rotationClass3} relative inset-0 z-10 h-full w-full rounded-sm border border-base-200 bg-[#fff] shadow-md transition duration-300 ease-in-out hover:rotate-0 overflow-clip`}
      >
        <Image
          src={`/images/${imgName}.png`}
          alt={title}
          width={500}
          height={500}
          className={clsx(
            "mt-0 rounded-sm w-full",
            variant === "thumbnail" ? "object-cover h-full" : "object-fill"
          )}
        />
      </div>
    </div>
  );
}

export default function PaperImage({ uuid, type, imgName, title, className, variant = "thumbnail" }) {
  return (
    <div className={clsx("relative w-full max-w-lg self-center", variant === "thumbnail" && "h-44", className)}>
      {type === "book" && (
        <BookImg uuid={uuid} imgName={imgName} title={title} variant={variant} />
      )}
      {type === "paper" && (
        <PaperImg uuid={uuid} imgName={imgName} title={title} variant={variant} />
      )}
    </div>
  );
}
