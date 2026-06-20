import { Suspense } from "react";

import {
  getAllCollectionOverviews,
  getCollectionDetailsById,
} from "@/app/lib/data";

import PaperDetails from "@/components/papers/PaperDetails";
import Collection from "@/components/collection/Collection";
import AllCollectionsSkeleton from "@/components/collection/AllCollectionsSkeleton";

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await getAllCollectionOverviews();
  return collections.map(({ uuid }) => ({ id: uuid }));
}

export default async function CollectionDetail({ params }) {
  const { id } = await params;
  const collection = await getCollectionDetailsById(id);
  return (
    <main className="flex flex-col w-full grow pb-content-y pt-content-y">
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
    </main>
  );
}
