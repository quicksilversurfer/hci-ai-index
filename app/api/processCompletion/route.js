import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { NextResponse } from "next/server";
import OpenAI from "openai";

import { awsClientConfig } from "@/app/lib/awsCredentials";
import { getPapersDetailsByIds } from "@/app/lib/data";
import {
  cacheGeneration,
  enforceGenerateRateLimit,
  GenerateRequestError,
  getCachedGeneration,
  readGenerateQuery,
} from "@/app/lib/generateSecurity";

export const runtime = "nodejs";

const REGION = process.env.AWS_REGION ?? "us-west-2";
const MODEL_ID = "amazon.titan-embed-text-v2:0";
const SEARCH_INDEX_URL =
  process.env.HCI_SEARCH_INDEX_URL ??
  "https://d4409x4u6zb58.cloudfront.net/search/papers-v1.json";
const PRIVATE_RESPONSE_HEADERS = { "Cache-Control": "private, no-store" };
const bedrock = new BedrockRuntimeClient(awsClientConfig(REGION));
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embed(text) {
  const response = await bedrock.send(
    new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        inputText: text,
        dimensions: 512,
        normalize: true,
      }),
    }),
  );

  return JSON.parse(new TextDecoder().decode(response.body)).embedding;
}

async function getSearchIndex() {
  const response = await fetch(SEARCH_INDEX_URL, {
    next: { revalidate: 86400, tags: ["paper-search-index"] },
  });

  if (!response.ok) {
    throw new Error(`Search index request failed (${response.status})`);
  }

  const index = await response.json();
  if (!Array.isArray(index.items) || index.dimensions !== 512) {
    throw new Error("Search index has an unsupported schema");
  }

  return index;
}

function dotProduct(left, right) {
  let score = 0;
  for (let index = 0; index < left.length; index += 1) {
    score += left[index] * right[index];
  }
  return score;
}

async function synthesizeAnswer(query, papers) {
  const sources = papers
    .map(
      (paper, index) =>
        `[${index + 1}] ${paper.title}\nAuthors: ${paper.author.join(", ")}\nSummary: ${paper.summary}`,
    )
    .join("\n\n");

  const response = await openai.responses.create({
    model: process.env.OPENAI_GENERATION_MODEL ?? "gpt-5-mini",
    input: [
      {
        role: "system",
        content:
          "Answer the user's HCI question using only the supplied research-paper summaries. Do not introduce unsupported researchers, findings, or examples. Create a concise question-style title and one compact paragraph under 900 characters that directly answers the question and connects the strongest findings across the sources. Do not use headings, lists, or citations in the description.",
      },
      {
        role: "user",
        content: `Question: ${query}\n\nResearch sources:\n${sources}`,
      },
    ],
    max_output_tokens: 1200,
    reasoning: { effort: "minimal" },
    text: {
      verbosity: "low",
      format: {
        type: "json_schema",
        name: "grounded_hci_answer",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
          },
          required: ["title", "description"],
          additionalProperties: false,
        },
      },
    },
  });

  if (response.status !== "completed" || !response.output_text) {
    throw new Error(
      `Answer generation did not complete (${response.incomplete_details?.reason ?? response.status})`,
    );
  }

  return JSON.parse(response.output_text);
}

export async function POST(request) {
  try {
    const { query, queryId, clientId } = await readGenerateQuery(request);
    const cached = await getCachedGeneration(queryId);

    if (cached) {
      const papers = await getPapersDetailsByIds(cached.paperIds);
      return NextResponse.json(
        { title: cached.title, description: cached.description, papers },
        { headers: { ...PRIVATE_RESPONSE_HEADERS, "X-HCI-Cache": "HIT" } },
      );
    }

    await enforceGenerateRateLimit(clientId);

    const [queryEmbedding, searchIndex] = await Promise.all([
      embed(query),
      getSearchIndex(),
    ]);

    const rankedPaperIds = searchIndex.items
      .map((item) => ({
        id: item.id,
        score: dotProduct(queryEmbedding, item.embedding),
      }))
      .sort((left, right) => right.score - left.score)
      .map((item) => item.id);
    const seenPaperIds = new Set();
    const paperIds = rankedPaperIds
      .filter((id) => {
        const normalizedId = id.toLowerCase();
        if (seenPaperIds.has(normalizedId)) return false;
        seenPaperIds.add(normalizedId);
        return true;
      })
      .slice(0, 10);

    const paperResults = await getPapersDetailsByIds(paperIds);
    const papers = [...new Map(
      paperResults.map((paper) => [paper.uuid.toLowerCase(), paper]),
    ).values()];
    const answer = await synthesizeAnswer(query, papers);

    await cacheGeneration(queryId, {
      ...answer,
      paperIds: papers.map((paper) => paper.uuid),
    });

    return NextResponse.json(
      { ...answer, papers },
      { headers: { ...PRIVATE_RESPONSE_HEADERS, "X-HCI-Cache": "MISS" } },
    );
  } catch (error) {
    if (error instanceof GenerateRequestError) {
      return NextResponse.json(
        { error: error.message },
        {
          status: error.status,
          headers: {
            ...PRIVATE_RESPONSE_HEADERS,
            ...(error.retryAfter && { "Retry-After": String(error.retryAfter) }),
          },
        },
      );
    }

    console.error("Grounded HCI generation failed", error);
    return NextResponse.json(
      { error: "Unable to search papers right now" },
      { status: 500, headers: PRIVATE_RESPONSE_HEADERS },
    );
  }
}
