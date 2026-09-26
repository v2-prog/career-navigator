/**
 * Cloudflare Pages Function — POST /plan
 */
import { buildPlan, DEFAULT_INPUTS, deepMerge } from "../src/buildPlan.esm.js";
import data from "../src/data-bundle.esm.js";

export async function onRequestPost({ request }) {
  let body = {};
  try { body = await request.json(); } catch {}
  const plan = buildPlan(deepMerge(DEFAULT_INPUTS, body), data);
  return new Response(JSON.stringify(plan, null, 2), {
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
