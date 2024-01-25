import supabase from "@/app/lib/supabase";
import { notFound } from "next/navigation";

// For all collections, fetch it's details, and paper images
export async function getAllCollectionOverviews() {
  try {
    // Fetch all collections
    const { data: collections, error: collectionsError } = await supabase
      .from("collection")
      .select("uuid, title, description, category, category_type, papers");

    if (collectionsError) throw collectionsError;
    if (!collections || collections.length === 0)
      throw new Error("No collections found");

    // For each collection, fetch its papers
    const collectionsWithPapers = await Promise.all(
      collections.map(async (collection) => {
        if (collection.papers && collection.papers.length) {
          const { data: papers, error: papersError } = await supabase
            .from("papers")
            .select("uuid, title, type, image_name")
            .in("uuid", collection.papers);

          if (papersError) throw papersError;
          return { ...collection, papers };
        }

        return { ...collection, papers: [] };
      })
    );

    return collectionsWithPapers;
  } catch (error) {
    console.error(error.message);
    notFound();
  }
}

// For a single collection, fetch its details and all paper details
export async function getCollectionDetailsById(id: string) {
  try {
    // Fetch the collection by id
    const { data: collection, error: collectionError } = await supabase
      .from("collection")
      .select("uuid, title, description, category, category_type, papers")
      .eq("uuid", id)
      .single();

    if (collectionError) throw collectionError;
    if (!collection) throw new Error("No collection found");

    // If the collection has papers, fetch them
    let papers = [];
    if (collection.papers && collection.papers.length) {
      const { data: papersData, error: papersError } = await supabase
        .from("papers")
        .select("uuid, title, type, image_name, author, summary, link, date")
        .in("uuid", collection.papers);

      if (papersError) throw papersError;
      papers = papersData;
    }

    // Return the collection with its papers
    return { ...collection, papers };
  } catch (error) {
    console.error(error.message);
    notFound();
  }
}

export async function getPapersDetailsByIds(paperIds: Array<string>) {
  try {
    // Check if paperIds array is provided and has elements
    if (!paperIds || !paperIds.length) {
      throw new Error("No paper IDs provided");
    }

    // Fetch papers by IDs
    const { data: papersData, error: papersError } = await supabase
      .from("papers")
      .select("uuid, title, type, image_name, author, summary, link, date")
      .in("uuid", paperIds);

    if (papersError) throw papersError;

    return papersData;
  } catch (error) {
    console.error(error.message);
    return []; // or handle the error as per your application's needs
  }
}

export async function getAllPapersDetails() {
  try {
    // Fetch all papers
    const { data: papersData, error: papersError } = await supabase
      .from("papers")
      .select("uuid, title, type, author, link, date");

    if (papersError) throw papersError;

    return papersData;
  } catch (error) {
    console.error(error.message);
    return []; // or handle the error as per your application's needs
  }
}
