import { useMemo } from "react";
import Image from "next/image";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function BookImg({ uuid, imgName, title }) {
  return (
    <div key={uuid} className="relative h-full w-full">
      <div className="relative inset-0 z-0 transition duration-300 ease-in-out hover:scale-105 shadow-md bg-[#fff] rounded-sm">
        <Image
          src={`/images/${imgName}.png`}
          alt={title}
          width={500}
          height={500}
          className="mt-0 rounded-sm object-fill"
        />
      </div>
    </div>
  );
}

function PaperImg({ uuid, imgName, title }) {
  const rotations = ["-rotate-3", "rotate-1", "rotate-3"];
  const [rotationClass1, rotationClass2, rotationClass3] = useMemo(
    () => shuffleArray([...rotations]),
    []
  );
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
          className="mt-0 rounded-sm object-fill w-full"
        />
      </div>
    </div>
  );
}

export default function PaperImage({ uuid, type, imgName, title }) {
  return (
    <div className="relative w-full max-w-lg self-center">
      {type === "book" && (
        <BookImg uuid={uuid} imgName={imgName} title={title} />
      )}
      {type === "paper" && (
        <PaperImg uuid={uuid} imgName={imgName} title={title} />
      )}
    </div>
  );
}
