import Link from "next/link";

import { getAllCollectionOverviews } from "@/app/lib/data";

import Collection from "@/components/collection/Collection";
import PaperImage from "@/components/papers/PaperImage";

export default async function AllCollections() {
  const collections = await getAllCollectionOverviews();
  return (
    <article>
      <h3 className="font-mono text-base dark:text-base-500 text-base-600 mb-12 pt-4 mt-12 border-t uppercase">
        01 - Roots and evolution of HCI
      </h3>
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {collections.map((collection) => {
          if (collection.category.trim() === "Evolution") {
            return (
              <Link
                key={collection.uuid}
                href={`/collection/${collection.uuid}`}
              >
                <Collection variant="overview" {...collection}>
                  {collection.papers.slice(0, 3).map((paper) => (
                    <PaperImage
                      key={paper.uuid}
                      uuid={paper.uuid}
                      type={paper.type}
                      imgName={paper.image_name}
                      title={paper.title}
                    />
                  ))}
                </Collection>
              </Link>
            );
          }
        })}
      </section>
      <h3 className="font-mono text-base dark:text-base-500 text-base-600 mb-12 pt-4 mt-12 border-t uppercase">
        02 - Accessibility & Evaluations
      </h3>
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {collections.map((collection) => {
          if (collection.category.trim() === "Evaluation") {
            return (
              <Link
                key={collection.uuid}
                href={`/collection/${collection.uuid}`}
              >
                <Collection variant="overview" {...collection}>
                  {collection.papers.slice(0, 3).map((paper) => (
                    <PaperImage
                      key={paper.uuid}
                      uuid={paper.uuid}
                      type={paper.type}
                      imgName={paper.image_name}
                      title={paper.title}
                    />
                  ))}
                </Collection>
              </Link>
            );
          }
        })}
      </section>
      <h3 className="font-mono text-base dark:text-base-500 text-base-600 mb-12 pt-4 mt-12 border-t uppercase">
        03 - Understanding Interaction
      </h3>
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {collections.map((collection) => {
          if (collection.category.trim() === "Interaction") {
            return (
              <Link
                key={collection.uuid}
                href={`/collection/${collection.uuid}`}
              >
                <Collection variant="overview" {...collection}>
                  {collection.papers.slice(0, 3).map((paper) => (
                    <PaperImage
                      key={paper.uuid}
                      uuid={paper.uuid}
                      type={paper.type}
                      imgName={paper.image_name}
                      title={paper.title}
                    />
                  ))}
                </Collection>
              </Link>
            );
          }
        })}
      </section>
      <h3 className="font-mono text-base dark:text-base-500 text-base-600 mb-12 pt-4 mt-12 border-t uppercase">
        04 - Social Computing
      </h3>
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {collections.map((collection) => {
          if (
            collection.category.trim() === "Collaborative & Social Computing"
          ) {
            return (
              <Link
                key={collection.uuid}
                href={`/collection/${collection.uuid}`}
              >
                <Collection variant="overview" {...collection}>
                  {collection.papers.slice(0, 3).map((paper) => (
                    <PaperImage
                      key={paper.uuid}
                      uuid={paper.uuid}
                      type={paper.type}
                      imgName={paper.image_name}
                      title={paper.title}
                    />
                  ))}
                </Collection>
              </Link>
            );
          }
        })}
      </section>
      <h3 className="font-mono text-base dark:text-base-500 text-base-600 mb-12 pt-4 mt-12 border-t uppercase">
        05 - Human-AI Collaboration
      </h3>
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {collections.map((collection) => {
          if (collection.category.trim() === "Human-AI Systems") {
            return (
              <Link
                key={collection.uuid}
                href={`/collection/${collection.uuid}`}
              >
                <Collection variant="overview" {...collection}>
                  {collection.papers.slice(0, 3).map((paper) => (
                    <PaperImage
                      key={paper.uuid}
                      uuid={paper.uuid}
                      type={paper.type}
                      imgName={paper.image_name}
                      title={paper.title}
                    />
                  ))}
                </Collection>
              </Link>
            );
          }
        })}
      </section>
      <h3 className="font-mono text-base dark:text-base-500 text-base-600 mb-12 pt-4 mt-12 border-t uppercase">
        06 - HCI Futures
      </h3>
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {collections.map((collection) => {
          if (
            collection.category.trim() === "Speculative & Ethical Perspectives"
          ) {
            return (
              <Link
                key={collection.uuid}
                href={`/collection/${collection.uuid}`}
              >
                <Collection variant="overview" {...collection}>
                  {collection.papers.slice(0, 3).map((paper) => (
                    <PaperImage
                      key={paper.uuid}
                      uuid={paper.uuid}
                      type={paper.type}
                      imgName={paper.image_name}
                      title={paper.title}
                    />
                  ))}
                </Collection>
              </Link>
            );
          }
        })}
      </section>
    </article>
  );
}
