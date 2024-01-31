import { Suspense } from "react";

import { getCollectionDetailsById } from "@/app/lib/data";

import PaperDetails from "@/components/papers/PaperDetails";
import Collection from "@/components/collection/Collection";
import AllCollectionsSkeleton from "@/components/collection/AllCollectionsSkeleton";

export default async function CollectionDetail({ params }) {
  const collection = await getCollectionDetailsById(params.id);
  return (
    <>
      <Suspense fallback={<AllCollectionsSkeleton />}>
        <Collection variant="details" {...collection}>
          {collection.papers.map((paper) => (
            <PaperDetails
              key={paper.uuid}
              imgId={paper.uuid}
              title={paper.title}
              imgType={paper.type}
              imgName={paper.image_name}
              authors={paper.author}
              summary={paper.summary}
              link={paper.link}
              date={paper.date}
            />
          ))}
        </Collection>
      </Suspense>
    </>
  );
}
