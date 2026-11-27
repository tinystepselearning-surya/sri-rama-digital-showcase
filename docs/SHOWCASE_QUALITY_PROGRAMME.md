# Sri Raama — phased showcase quality programme
Baseline: 27 November 2026. Scope: 157 registered routes, including five legacy teacher aliases, five operational workspaces, nine campus/residential reporting entries, 2,304 fictional learners. No new routes without a specific approved need. All study resources and assessments remain free; existing proposed annual/crash prices unchanged. No real student/contact data, auth, live payment, external AI, Firestore or Cloud Functions. Hosting project sri-rama-digital-demo only.

## Status and gates
| Phase | Status | Acceptance evidence |
|---|---|---|
| 00 Engineering baseline | Closed — verified starting gate; release reproducibility open until phase 08 | b9c24f925e159b2f2face40c48b4d811f2612496; CI 46004577690 and 46004569595 success; each candidate and hosted audit 314 checks, zero issues. Hosted route audit does not prove exact deployed commit. Additional evidence: [P00 baseline closure](P00_BASELINE_CLOSURE.md), [route inventory](P00_ROUTE_BASELINE.json), run 46005034589. |
| 01 Data realism & integrity | Closed — verified candidate | Source-backed metric dictionary; all periods and campus/stream scopes reconcile; lead stage and date invariants; no unsupported stats; seeded tasks valid; separate current snapshot vs historical data; no chart misrepresentation. |
| 02 Institutional website excellence | Educational-depth extension — verification pending | Page inventory reviewed; positive source-backed factual copy; consistent campus labels and contacts; no invented institutional achievements; distinct campus/programme pages; no placeholders presented as facts. |
| 03 Premium UX/UI & design consistency | Pending | Consistent semantic icons, spacing, type, colours, card/table patterns; inspect representative page templates and page-level exceptions; actual analytical visuals only. |
| 04 Enterprise workspace excellence | Pending | Founder actionability; Centre Head scope; campus vs online CRM; family and learner-specific workflows; reliable empty states and filter behavior; role-specific visual hierarchy. |
| 05 Online academy & educational quality | Pending | Verify every question/answer/explanation, chapter association, mock scoring and graph; original representative questions; clearly bounded samples; free policy and catalogue consistency. |
| 06 Mobile, accessibility & performance | Pending | 157 routes desktop/phone, selected 360/768; keyboard interaction, focus and contrast review, browser resource/console checks; physical device and Safari review or explicit limitation; representative screenshots and page audit. |
| 07 End-to-end business demonstrations | Pending | Demonstrate prospect-to-CRM, campus academic record-to-parent, assignment-to-student, learner-specific mock/revision, action-to-founder, and fee reconciliation without live transactions; founder presentation runbook. |
| 08 Final release & Firebase verification | Pending | Artwork permissions/identifier review (owner confirmation where needed), reproducible dependencies, release manifest and exact candidate verification; explicit deployment approval; hosted validation and rollback instructions. |

## Working rules
- Work one phase at a time, with focused changes and an evidence-backed closure record. Do not claim completed testing before results. Record blockers and decisions.
- Preserve existing routes, prices, financial rules, source-backed institutional claims and sample-only state. Do not fabricate ranks, staff qualifications or real enrolment.
- At each gate: inspect actual source; implement scoped corrections; run static, data and browser regressions; report findings, exact commit and remaining limitations. Candidate build stays separate from live release until approved.
- Every rendered route needs valid title/heading, correct page identity, no broken assets, no unintended overflow and no runtime errors. Automated checks do not replace visual, content or accessibility review.
- Avoid exposing student examination identifiers in public artwork. Noindex is not privacy or authorization.
- The fresh baseline hosted audit was successful; the latest development candidate is also successful. Whether they are byte-identical is not established.
- No deployment, merge to main, or changes to Tiny Steps in the phase 00/01 increment.

P01 metric definitions and candidate corrections: [P01_METRIC_DICTIONARY.md](P01_METRIC_DICTIONARY.md). Gate remains open until exact candidate CI evidence is recorded.

P01 closure: exact commit 01c49afe009d712fc5223f69bfdc30b0a44fa95b; runs 46006050068 and 46006037896 succeeded. 432 cohort-month checks, 314 candidate and 314 hosted page checks, no issues. 2,304 learners; 1,422 campus and 793 online enquiries; 145 paid orders; ₹902,355 online receipts; ₹263,962,000 annual campus commitments and ₹195,355,087 campus collections. Hosted checks do not identify exact deployed commit. P02 source review and corrections documented in [P02_INSTITUTIONAL_REVIEW.md](P02_INSTITUTIONAL_REVIEW.md).

P02 initial candidate a62ec9e5366a4cf2156425e472e3eb9372a63a88 passed runs 46006759421 and 46006752204 (314 candidate and 314 hosted checks, zero issues). Owner clarified content means educational quality, approach and substance, not cosmetic copy. Extend P02 with evidence-informed teaching cycle, four original stream examples, five methodology and three support examples. Continuous educational-quality workstream across phases; P05 remains deeper resource/question bank review. [Educational quality framework](P02_EDUCATIONAL_FRAMEWORK.md). Exact extension verification pending.
