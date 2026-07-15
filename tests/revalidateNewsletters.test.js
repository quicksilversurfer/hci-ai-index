import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const cacheMocks = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

vi.mock("next/cache", () => cacheMocks);

import { POST } from "../app/api/revalidate-newsletters/route.ts";

function request(issueId = "2026-W28", token = "test-secret") {
  return new Request("https://hciindex.com/api/revalidate-newsletters", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ issue_id: issueId }),
  });
}

beforeEach(() => {
  process.env.NEWSLETTER_REVALIDATION_SECRET = "test-secret";
  cacheMocks.revalidatePath.mockClear();
  cacheMocks.revalidateTag.mockClear();
});

afterEach(() => {
  delete process.env.NEWSLETTER_REVALIDATION_SECRET;
});

describe("newsletter revalidation webhook", () => {
  it("rejects requests when the server secret is missing", async () => {
    delete process.env.NEWSLETTER_REVALIDATION_SECRET;

    const response = await POST(request());

    expect(response.status).toBe(503);
    expect(cacheMocks.revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects an invalid bearer token", async () => {
    const response = await POST(request("2026-W28", "wrong-secret"));

    expect(response.status).toBe(401);
    expect(cacheMocks.revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects malformed issue identifiers", async () => {
    const response = await POST(request("2026-W99"));

    expect(response.status).toBe(400);
    expect(cacheMocks.revalidateTag).not.toHaveBeenCalled();
  });

  it("expires newsletter data and reader-facing routes immediately", async () => {
    const response = await POST(request());
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(cacheMocks.revalidateTag).toHaveBeenCalledWith(
      "newsletters-index",
      { expire: 0 },
    );
    expect(cacheMocks.revalidateTag).toHaveBeenCalledWith(
      "newsletter-2026-W28",
      { expire: 0 },
    );
    expect(cacheMocks.revalidatePath).toHaveBeenCalledWith("/");
    expect(cacheMocks.revalidatePath).toHaveBeenCalledWith(
      "/newsletters/2026-W28",
    );
    expect(result).toMatchObject({ revalidated: true, issue_id: "2026-W28" });
  });
});
