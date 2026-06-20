import { notFound } from "next/navigation";

const DEFAULT_DATA_BASE_URL =
  "https://d4409x4u6zb58.cloudfront.net/collections-data";
const DATA_BASE_URL = (
  process.env.HCI_COLLECTIONS_DATA_BASE_URL ?? DEFAULT_DATA_BASE_URL
).replace(/\/$/, "");

class DataResponseError extends Error {
  status: number;

  constructor(path: string, status: number) {
    super(`Collections data request failed (${status}): ${path}`);
    this.status = status;
  }
}

async function fetchData<T>(path: string): Promise<T> {
  const response = await fetch(`${DATA_BASE_URL}/${path}`, {
    next: {
      revalidate: 3600,
      tags: ["collections-data"],
    },
  });

  if (!response.ok) {
    throw new DataResponseError(path, response.status);
  }

  return response.json() as Promise<T>;
}

type PaperDetail = {
  uuid: string;
  title: string;
  type: string;
  image_name: string;
  author: string[];
  summary: string;
  link: string;
  date: string;
};

type CollectionOverview = {
  uuid: string;
  title: string;
  description: string;
  category: string;
  category_type: string | null;
  papers: Pick<PaperDetail, "uuid" | "title" | "type" | "image_name">[];
};

type CollectionDetail = Omit<CollectionOverview, "papers"> & {
  papers: PaperDetail[];
};

type PaperListItem = Pick<PaperDetail, "uuid" | "title" | "type" | "author" | "link" | "date">;

export async function getAllCollectionOverviews(): Promise<CollectionOverview[]> {
  try {
    const data = await fetchData<{ collections: CollectionOverview[] }>(
      "collections/index.json",
    );
    return data.collections;
  } catch (error) {
    console.error("Unable to load collection index", error);
    return [];
  }
}

export async function getCollectionDetailsById(id: string): Promise<CollectionDetail> {
  try {
    return await fetchData<CollectionDetail>(
      `collections/by-id/${encodeURIComponent(id)}.json`,
    );
  } catch (error) {
    if (
      error instanceof DataResponseError &&
      (error.status === 403 || error.status === 404)
    ) {
      notFound();
    }
    throw error;
  }
}

export async function getPapersDetailsByIds(paperIds: string[]): Promise<PaperDetail[]> {
  if (!paperIds?.length) return [];

  const results = await Promise.allSettled(
    paperIds.map((id) =>
      fetchData<PaperDetail>(`papers/by-id/${encodeURIComponent(id.toLowerCase())}.json`),
    ),
  );

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`Unable to load paper ${paperIds[index]}`, result.reason);
    }
  });

  return results.flatMap((result) => (result.status === "fulfilled" ? [result.value] : []));
}

export async function getAllPapersDetails(): Promise<PaperListItem[]> {
  try {
    const data = await fetchData<{ papers: PaperListItem[] }>("papers/index.json");
    return data.papers;
  } catch (error) {
    console.error("Unable to load papers index", error);
    return [];
  }
}
