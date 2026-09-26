# Career Navigator 15–27

Detailed, adaptable career-pathway planner a parent and a ~15-year-old can use together. Ages **15 through 27**, multiple named paths, sliders that rewrite the year-by-year plan.

**Australia only. Educational planner — not legal, tax, migration, or careers advice.**  
Every licence age and university cut-off must be re-checked on the official site. Rules move.

Companion to [AcerLab Navigator](https://github.com/v2-prog/navigator) and [Structure Lab AU](https://github.com/v2-prog/structure-lab).

## What shipped

| Surface | Status |
| --- | --- |
| Web app (static SPA) | Yes — `index.html` + `app.css` + `app.js` + `src/buildPlan.js` |
| Bot worker sibling | Yes — rules-only (no LLM) as Pages Functions `functions/plan.js` + `functions/ask.js`, and `worker/index.js` |
| Unit tests | `tests/rules.test.js` |

Same data model for both surfaces. The worker must not invent licence ages.

## GitHub + Cloudflare

The GitHub account attached to this workspace is **v2-prog** (`amarwakara@gmail.com` is the Cloudflare login). AmarWak copies have historically been mirrors without Pages source rights. Ship from **v2-prog/career-navigator**. Fork to AmarWak if you want a second copy.

| Role | Value |
| --- | --- |
| Source | https://github.com/v2-prog/career-navigator |
| Cloudflare account | Amarwakara@gmail.com (zone `acerlab.link`) |
| Suggested hostname | `career.acerlab.link` |
| Do not attach | `earthacer.in` |

### Pages settings

1. Workers & Pages → Create → Connect to Git → **v2-prog/career-navigator**, branch `main`.
2. Framework preset: **None**. Build command: empty. Output directory: `/`.
3. Optional custom domain in the `acerlab.link` zone.
4. Pages will also pick up `functions/` (`POST /plan`, `POST /ask`). If a Functions build fails, delete or rename `functions/` and ship the static app only.

## Local

```bash
python3 -m http.server 8080
# open http://127.0.0.1:8080
```

```bash
node tests/rules.test.js
```

## How to use

1. **Setup** — sliders and path toggles. Changing any control rebuilds the plan in the same page.
2. **Strategy / Timeline / This year** — generated from `buildPlan(inputs, data)`.
3. **Export JSON / Import JSON** — scenario lives in `localStorage` and in the JSON blob so a second device or the worker can load it.
4. Gate ticks persist with the scenario.

Sample inputs: `public/scenario.amarfio.default.json` (no private addresses, phones, or school names).

## Worker

Rules-only v1. Keyword intents: `this year`, `age 16`, `atar`, `conveyancing`, `chef`, `ca`, `export`.

```
POST /plan   body = Inputs JSON
POST /ask    body = { question, inputs }
```

Acceptance example: *Can he be a conveyancer in Canberra at 21 with only an Advanced Diploma?* → **No** (R3).

## Rules encoded vs re-verify live

Encoded: R1–R12 as in `data/rules.json` and `src/buildPlan.js`.
Re-verify live every offer year: UAC, Fair Trading, Access Canberra, CA ANZ, TPB, BSSS, CIT.

## Open questions for the parent

- Confirm the **second node** (Casino vs Yass / Murrumbateman / Kyogle / Coffs / Other).
- Confirm **ATAR intent**.
- Confirm kitchen **allergy** toggle after a real clinician, not this app.
