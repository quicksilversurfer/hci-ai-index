import { timingSafeEqual } from "node:crypto";

import { revalidatePath, revalidateTag } from "next/cache";

export const runtime = "nodejs";

const ISSUE_ID_PATTERN = /^(\d{4})-W(\d{2})$/;

function secureEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function readBearerToken(request: Request): string {
  const authorization = request.headers.get("authorization") || "";
  return authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";
}

function isIssueId(value: unknown): value is string {
  if (typeof value !== "string") return false;

  const match = value.match(ISSUE_ID_PATTERN);
  if (!match) return false;

  const week = Number(match[2]);
  return week >= 1 && week <= 53;
}

function json(body: object, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request): Promise<Response> {
  const expectedToken = process.env.NEWSLETTER_REVALIDATION_SECRET;
  if (!expectedToken) {
    console.error("NEWSLETTER_REVALIDATION_SECRET is not configured");
    return json({ error: "Revalidation is not configured" }, 503);
  }

  const providedToken = readBearerToken(request);
  if (!providedToken || !secureEqual(providedToken, expectedToken)) {
    return json({ error: "Unauthorized" }, 401);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Expected a JSON request body" }, 400);
  }

  const issueId =
    body && typeof body === "object" && "issue_id" in body
      ? (body as { issue_id?: unknown }).issue_id
      : undefined;
  if (!isIssueId(issueId)) {
    return json({ error: "issue_id must use YYYY-Www format" }, 400);
  }

  const tags = ["newsletters-index", `newsletter-${issueId}`];
  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }

  const paths = [
    "/",
    "/newsletters",
    `/newsletters/${issueId}`,
    `/newsletters/${issueId}/opengraph-image`,
    "/rss.xml",
    "/atom.xml",
    "/feed.json",
  ];
  for (const path of paths) {
    revalidatePath(path);
  }

  return json({ revalidated: true, issue_id: issueId, tags, paths });
}
