/**
 * Career Navigator worker — rules-only v1 (no LLM).
 * Endpoints:
 *   POST /plan   { Inputs }
 *   POST /ask    { question, inputs }
 */
import { buildPlan, answerQuestion, DEFAULT_INPUTS, deepMerge } from "../src/buildPlan.esm.js";

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function json(data, status) {
  return new Response(JSON.stringify(data, null, 2), {
    status: status || 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type",
      "access-control-allow-methods": "GET,POST,OPTIONS"
    }
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return json({ ok: true });
    const url = new URL(request.url);
    const data = env.CN_DATA;
    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
      return json({ ok: true, name: "career-navigator-worker", lastReviewed: "2026-09-26" });
    }
    if (request.method === "POST" && url.pathname === "/plan") {
      const body = await readJson(request);
      const plan = buildPlan(deepMerge(DEFAULT_INPUTS, body), data);
      return json(plan);
    }
    if (request.method === "POST" && url.pathname === "/ask") {
      const body = await readJson(request);
      const inputs = deepMerge(DEFAULT_INPUTS, body.inputs || {});
      const plan = buildPlan(inputs, data);
      const ans = answerQuestion(body.question || "", inputs, data, plan);
      return json(ans);
    }
    return json({ error: "Use POST /plan or POST /ask" }, 404);
  }
};
