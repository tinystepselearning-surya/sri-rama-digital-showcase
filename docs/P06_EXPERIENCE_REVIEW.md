# P06-A — Mobile and tablet experience

## Baseline and changes
P05-B closed with two successful exact candidate runs. The previous automated layout audit covered every registered route at 1440 and 390px, with only selected routes exercised at 360 and 768px in the browser workflow. P06-A extends candidate page checks to all four widths, retaining the hosted comparison at two widths. No change to route identity, heading, overflow, image, icon, console or noindex acceptance checks.

Source inspection found public paper/practice filters inherited compact desktop sizing and tablet navigation links inherited smaller touch targets. Scoped CSS gives paper/practice controls a minimum 44px height, 16px form text, two-column tablet layout and one-column narrow phone layout. Tablet public and workspace navigation and selected workspace controls have larger targets. Existing desktop and mobile workspace navigation models are preserved. No application data, logic, routes, fees, or hosting changes.

## Verification
Added browser cases at 360, 390 and 768px: five paper controls fit the viewport and meet 44px target height, generate Commerce MCQs, reveal answer key, check overflow, navigate via mobile menu to free practice, check practice subject target. Candidate audit expected 628 route-width checks; hosted audit expected 314. Exact candidate results pending. No physical device, Safari, screen reader, performance-budget or screenshot-by-screenshot review performed in this increment. P06-B/C/D remain open. No deployment.
