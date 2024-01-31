import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

import { getPapersDetailsByIds } from "@/app/lib/data";

export const runtime = "experimental-edge";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getEmbeddings = async (text) => {
  try {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small", // Replace with your desired model
      input: text,
    });
    return embedding.data[0].embedding;
  } catch (error) {
    console.error("Error in OpenAI Embedding:", error);
    throw error;
  }
};

const queryPineconeVectorStore = async (pc, indexName, embedding) => {
  try {
    console.log("Querying Pinecone vector store...");
    const index = pc.index(indexName);
    let queryResponse = await index.query({
      topK: 10,
      vector: embedding,
      includeValues: true,
    });
    return queryResponse;
  } catch (error) {
    console.error("Error in querying Pinecone:", error);
    throw error;
  }
};

export async function POST(req, res) {
  try {
    const data = await req.json();
    console.log("Data:", data);
    const combinedText = `${data.title}: ${data.description}`;

    if (!combinedText) {
      return Response.json({ error: "Text not provided" }, 400);
    }

    const embedding = await getEmbeddings(combinedText);
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const indexName = process.env.PINECONE_INDEX_NAME || "";
    const queryResponse = await queryPineconeVectorStore(
      pc,
      indexName,
      embedding
    );

    // Extract paper IDs from queryResponse
    const paperIds = queryResponse.matches.map((match) => match.id); // Assuming each match object has an 'id' field

    // Fetch details for each paper
    const papersDetails = await getPapersDetailsByIds(paperIds);

    // Send the response with paper details
    return NextResponse.json({ papers: papersDetails });

    // Catch errors
  } catch (error) {
    const errorResponse = { error: error.message };
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
