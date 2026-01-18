# Accessibility & color-contrast — Twinkle AI

This document summarizes the automated contrast audit for the Twinkle brand primary color (#ffd500) against the site background (#0b1220) and provides recommended usage patterns.

## Key results (automated)
- Base primary: `#ffd500` (contrast vs dark `#0b1220`: **13.17** — PASS for normal text)
- Recommended accessible variants (from generated scale):
  - `--twinkle-500` = `#ffd500` (brand base)
  - `--twinkle-700` = `#bfa000`
  - `--twinkle-900` = `#665500`
  - `--twinkle-50`  = `#fffbe6` (very light)

## What passed / failed
- Yellow as text/icon on the dark site background (e.g. `#ffd500` on `#0b1220`) — PASS (excellent contrast).
- White text on yellow backgrounds — generally FAIL for most yellow shades (do **not** place white text on `--twinkle-500`).
- Yellow background + dark text (`#0b1220`) — PASS (recommended for filled CTA style).
- Very dark yellow (`--twinkle-900`) yields good contrast with white, but that shade is too close to the site background and loses emphasis.

## Recommended usage (short)
- Preferred: use `--twinkle-500` for accents, icons, outlines, and link/button text on the dark site background.
- For filled CTAs on dark pages: use `background: var(--twinkle-500); color: var(--twinkle-on-primary)` (dark text) — this meets WCAG.
- Avoid white text on `--twinkle-500` (insufficient contrast). If you need white text on a yellow background, use a much darker yellow (e.g. `--twinkle-900`) and verify contrast.
- Use `badge-twinkle` or `btn-twinkle-outline` for most CTAs on dark surfaces.

## Tokens (available in CSS)
- `--twinkle-50` … `--twinkle-900` — full tonal scale
- `--twinkle-on-primary` — recommended text color for primary backgrounds (dark site background)
- Utility classes: `.text-twinkle`, `.bg-twinkle` (filled with dark text), `.btn-twinkle-outline`

## Examples
- Accent link: `<a class="text-twinkle hover:underline">...</a>`
- CTA (preferred outline): `<button class="btn-twinkle-outline">探索專案</button>`
- CTA (filled): `<button class="btn-twinkle-filled">加入 Discord</button>`

## Notes & next steps
- Run a visual regression and manual a11y audit (axe / Lighthouse) on the deployed preview.
- Consider adding a variant token `--twinkle-contrast` for dark-mode high-contrast needs.

Generated with an automated contrast audit — if you want, I can open a PR that includes a visual demo page showing each token and the corresponding contrast ratios.