import {
  ConditionalCheckFailedException,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { createHash } from "node:crypto";

import { awsClientConfig } from "@/app/lib/awsCredentials";

const REGION = process.env.AWS_REGION ?? "us-west-2";
const TABLE_NAME = process.env.HCI_GENERATE_RATE_LIMIT_TABLE;
const CACHE_SECONDS = 24 * 60 * 60;
const MAX_BODY_BYTES = 2_048;
const MIN_QUERY_LENGTH = 3;
const MAX_QUERY_LENGTH = 200;
const dynamodb = TABLE_NAME
  ? new DynamoDBClient(awsClientConfig(REGION))
  : null;

const memoryState = globalThis.__hciGenerateSecurity ?? {
  cache: new Map(),
  counters: new Map(),
};
globalThis.__hciGenerateSecurity = memoryState;

export class GenerateRequestError extends Error {
  constructor(message, status, retryAfter) {
    super(message);
    this.name = "GenerateRequestError";
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizedQuery(query) {
  return query.trim().replace(/\s+/g, " ").toLowerCase();
}

function requestOrigin(request) {
  const requestUrl = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const protocol =
    request.headers.get("x-forwarded-proto") ?? requestUrl.protocol.replace(":", "");

  return host ? `${protocol}://${host}` : requestUrl.origin;
}

function allowedOrigins(request) {
  const configured = (process.env.HCI_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return new Set([requestOrigin(request), ...configured]);
}

function assertSameOrigin(request) {
  if (process.env.NODE_ENV !== "production") return;

  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  const isSameSite = fetchSite === "same-origin" || fetchSite === "same-site";

  if ((origin && !allowedOrigins(request).has(origin)) || (!origin && !isSameSite)) {
    throw new GenerateRequestError("This request is not allowed", 403);
  }
}

function clientAddress(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const forwardedAddress = forwarded?.split(",").at(-1)?.trim();
  return forwardedAddress || request.headers.get("x-real-ip") || "unknown";
}

export async function readGenerateQuery(request) {
  assertSameOrigin(request);

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    throw new GenerateRequestError("JSON is required", 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    throw new GenerateRequestError("The request is too large", 413);
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
    throw new GenerateRequestError("The request is too large", 413);
  }

  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch {
    throw new GenerateRequestError("The request is not valid JSON", 400);
  }

  const query = typeof parsed.query === "string" ? parsed.query.trim() : "";
  if (query.length < MIN_QUERY_LENGTH || query.length > MAX_QUERY_LENGTH) {
    throw new GenerateRequestError(
      `Search text must be ${MIN_QUERY_LENGTH}–${MAX_QUERY_LENGTH} characters`,
      400,
    );
  }
  if (/\p{Cc}/u.test(query)) {
    throw new GenerateRequestError("Search text contains unsupported characters", 400);
  }

  return { query, clientId: hash(clientAddress(request)), queryId: hash(normalizedQuery(query)) };
}

async function consumeCounter(key, limit, windowSeconds) {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = Math.floor(now / windowSeconds) * windowSeconds;
  const retryAfter = windowStart + windowSeconds - now;
  const windowKey = `limit#${key}#${windowStart}`;

  if (!dynamodb) {
    if (process.env.NODE_ENV === "production") {
      throw new GenerateRequestError("Search is temporarily unavailable", 503);
    }
    const count = memoryState.counters.get(windowKey) ?? 0;
    if (count >= limit) {
      throw new GenerateRequestError(
        "You’ve reached the search limit. Please try again later.",
        429,
        retryAfter,
      );
    }
    memoryState.counters.set(windowKey, count + 1);
    return;
  }

  try {
    await dynamodb.send(
      new UpdateItemCommand({
        TableName: TABLE_NAME,
        Key: { pk: { S: windowKey } },
        UpdateExpression:
          "SET #count = if_not_exists(#count, :zero) + :one, #expiresAt = :expiresAt",
        ConditionExpression: "attribute_not_exists(#count) OR #count < :limit",
        ExpressionAttributeNames: {
          "#count": "count",
          "#expiresAt": "expiresAt",
        },
        ExpressionAttributeValues: {
          ":zero": { N: "0" },
          ":one": { N: "1" },
          ":limit": { N: String(limit) },
          ":expiresAt": { N: String(windowStart + windowSeconds + 86_400) },
        },
      }),
    );
  } catch (error) {
    if (error instanceof ConditionalCheckFailedException) {
      throw new GenerateRequestError(
        "You’ve reached the search limit. Please try again later.",
        429,
        retryAfter,
      );
    }
    throw error;
  }
}

export async function enforceGenerateRateLimit(clientId) {
  const burstLimit = positiveInteger(process.env.HCI_GENERATE_PER_IP_MINUTE_LIMIT, 2);
  const perIpLimit = positiveInteger(process.env.HCI_GENERATE_PER_IP_HOURLY_LIMIT, 10);
  const globalLimit = positiveInteger(process.env.HCI_GENERATE_GLOBAL_DAILY_LIMIT, 100);

  await consumeCounter(`burst#${clientId}`, burstLimit, 60);
  await consumeCounter(`client#${clientId}`, perIpLimit, 60 * 60);
  await consumeCounter("global", globalLimit, 24 * 60 * 60);
}

export async function getCachedGeneration(queryId) {
  const now = Math.floor(Date.now() / 1000);
  const key = `cache#${queryId}`;

  if (!dynamodb) {
    const cached = memoryState.cache.get(key);
    return cached?.expiresAt > now ? cached.value : null;
  }

  const response = await dynamodb.send(
    new GetItemCommand({
      TableName: TABLE_NAME,
      Key: { pk: { S: key } },
      ConsistentRead: false,
    }),
  );
  const item = response.Item;
  if (!item?.payload?.S || Number(item.expiresAt?.N ?? 0) <= now) return null;

  return JSON.parse(item.payload.S);
}

export async function cacheGeneration(queryId, value) {
  const expiresAt = Math.floor(Date.now() / 1000) + CACHE_SECONDS;
  const key = `cache#${queryId}`;

  if (!dynamodb) {
    memoryState.cache.set(key, { expiresAt, value });
    return;
  }

  await dynamodb.send(
    new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        pk: { S: key },
        expiresAt: { N: String(expiresAt) },
        payload: { S: JSON.stringify(value) },
      },
    }),
  );
}
