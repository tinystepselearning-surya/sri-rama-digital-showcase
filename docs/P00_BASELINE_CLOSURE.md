# P00 — Engineering baseline closure
Date: 27 November 2026. Decision: GO for Phase 01, not final release approval.

## Exact evidence
- Source baseline: 7028ce997dd92ad9b776b4d887203f62f0de9f0f (documentation-only changes from application commit b9c24f925e159b2f2face40c48b4d811f2612496).
- Completed run [46005034589](https://github.com/tinystepselearning-surya/sri-rama-digital-showcase/actions/runs/46005034589), job 140525948350. Build, static verification, browser regressions, candidate audit, hosted audit and artifact upload succeeded.
- Candidate and hosted each checked 157 unique paths at 1440 and 390px (314 checks each, zero detected failures). The companion P00_ROUTE_BASELINE.json was extracted from that job's route log, not guessed from navigation.
- Static tests verified 2,304 unique learner IDs, six months of bounded marks and attendance, annual fee and campus rollups, valid action references, eight paid and four free products, 36 question and 24 flashcard records, shared logo, legacy aliases and internal route checks.
- Hosting configuration checked: .firebaserc default sri-rama-digital-demo, public dist, trailingSlash true, noindex/nofollow/noarchive, nosniff and no-referrer headers. No Firestore rules or functions deployment configured.
- Main remains 2db6fa82fac468c9c1a574c615e1de923568eaa9; development branch is dev/showcase-v1. No merge or deployment performed.

## Controls
Preserve 157 routes (including five legacy aliases), five workspaces, existing pricing and free learning policy, synthetic-only operational data, reporting scope and independent Hosting project. Change one phase at a time; exact candidate tests and source diff required at each gate. No unapproved public institutional claims, live transactions, integrations or real records. Freeze baseline route inventory, not educational question count: approved content improvements can extend the question bank in phase 05.

## Open items carried forward
1. Dependency lockfile absent and npm install used by CI: reproducible dependency installation and release manifest due P08.
2. Live route checks prove current functionality within test scope, not byte-identical deployment or exact release SHA: P08 release identification.
3. Automated layout checks are not a visual review of every page or full accessibility assessment; P03/P06 visual, keyboard, contrast, device and performance review.
4. Public achievement artwork may contain real examination identifiers: P02/P08 permissions and privacy review. Noindex is not access control. Repository includes reference artwork under docs; review public exposure as well as hosted allowlist.
5. CI hosted audit is continue-on-error; inspect step/log evidence rather than treating workflow success alone as a hosted pass. This baseline's actual hosted step passed.
6. Static baseline verifies selected data constraints, not every KPI's semantic correctness: P01 detailed metric and cross-workspace reconciliation.

P00 is closed as an engineering starting gate; no claim of presentation approval or completed later phases. P01 is next.
