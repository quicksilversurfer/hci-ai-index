import { afterEach, describe, expect, it } from "vitest";

import {
  enforceGenerateRateLimit,
  GenerateRequestError,
  readGenerateQuery,
} from "../app/lib/generateSecurity.js";

const originalEnvironment = {
  nodeEnv: process.env.NODE_ENV,
  allowedOrigins: process.env.HCI_ALLOWED_ORIGINS,
  burstLimit: process.env.HCI_GENERATE_PER_IP_MINUTE_LIMIT,
  hourlyLimit: process.env.HCI_GENERATE_PER_IP_HOURLY_LIMIT,
  dailyLimit: process.env.HCI_GENERATE_GLOBAL_DAILY_LIMIT,
};

function request(body, headers = {}) {
  return new Request("https://hciindex.com/api/processCompletion", {
    method: "POST",
    body,
    headers: {
      "content-type": "application/json",
      host: "hciindex.com",
      origin: "https://hciindex.com",
      "sec-fetch-site": "same-origin",
      ...headers,
    },
  });
}

afterEach(() => {
  process.env.NODE_ENV = originalEnvironment.nodeEnv;
  process.env.HCI_ALLOWED_ORIGINS = originalEnvironment.allowedOrigins;
  process.env.HCI_GENERATE_PER_IP_MINUTE_LIMIT = originalEnvironment.burstLimit;
  process.env.HCI_GENERATE_PER_IP_HOURLY_LIMIT = originalEnvironment.hourlyLimit;
  process.env.HCI_GENERATE_GLOBAL_DAILY_LIMIT = originalEnvironment.dailyLimit;
});

describe("readGenerateQuery", () => {
  it("normalizes equivalent queries to the same cache key", async () => {
    const first = await readGenerateQuery(request(JSON.stringify({ query: "  Virtual   Reality " })));
    const second = await readGenerateQuery(request(JSON.stringify({ query: "virtual reality" })));

    expect(first.query).toBe("Virtual   Reality");
    expect(first.queryId).toBe(second.queryId);
  });

  it("rejects non-JSON requests", async () => {
    await expect(
      readGenerateQuery(request("query=hello", { "content-type": "text/plain" })),
    ).rejects.toMatchObject({ status: 415 });
  });

  it("rejects oversized and invalid search text", async () => {
    await expect(
      readGenerateQuery(request(JSON.stringify({ query: "x".repeat(201) }))),
    ).rejects.toMatchObject({ status: 400 });

    await expect(
      readGenerateQuery(request(JSON.stringify({ query: "hello\u0000world" }))),
    ).rejects.toMatchObject({ status: 400 });
  });

  it("blocks cross-origin production requests", async () => {
    process.env.NODE_ENV = "production";
    process.env.HCI_ALLOWED_ORIGINS = "https://www.hciindex.com";

    await expect(
      readGenerateQuery(
        request(JSON.stringify({ query: "virtual reality" }), {
          origin: "https://attacker.example",
          "sec-fetch-site": "cross-site",
        }),
      ),
    ).rejects.toMatchObject({ status: 403 });
  });
});

describe("enforceGenerateRateLimit", () => {
  it("rejects requests after the configured burst limit", async () => {
    process.env.NODE_ENV = "test";
    process.env.HCI_GENERATE_PER_IP_MINUTE_LIMIT = "1";
    process.env.HCI_GENERATE_PER_IP_HOURLY_LIMIT = "1000";
    process.env.HCI_GENERATE_GLOBAL_DAILY_LIMIT = "1000";
    const clientId = `test-${crypto.randomUUID()}`;

    await enforceGenerateRateLimit(clientId);

    await expect(enforceGenerateRateLimit(clientId)).rejects.toBeInstanceOf(
      GenerateRequestError,
    );
    await expect(enforceGenerateRateLimit(clientId)).rejects.toMatchObject({ status: 429 });
  });
});
