import { getCollectionDetailsById } from "@/app/lib/data";

import Collection from "@/components/collection/Collection";
import PaperDetails from "@/components/papers/PaperDetails";

export default async function CollectionDetail({ params }) {
  const collection = await getCollectionDetailsById(params.id);
  return (
    <>
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
    </>
  );
}
