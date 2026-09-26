/**
 * Cloudflare Pages Function — POST /ask
 * Thin wrapper over the same buildPlan + answerQuestion used by the web app.
 */
import { buildPlan, answerQuestion, DEFAULT_INPUTS, deepMerge } from "../src/buildPlan.esm.js";
import data from "../src/data-bundle.esm.js";

export async function onRequestPost({ request }) {
  let body = {};
  try { body = await request.json(); } catch {}
  const inputs = deepMerge(DEFAULT_INPUTS, body.inputs || {});
  const plan = buildPlan(inputs, data);
  const ans = answerQuestion(body.question || "", inputs, data, plan);
  return new Response(JSON.stringify(ans, null, 2), {
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST,OPTIONS",
      "access-control-allow-headers": "content-type"
    }
  });
}
