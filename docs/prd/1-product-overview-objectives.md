# 1. Product Overview & Objectives

**One‑liner:** Input one color → generate professional palettes (complementary, analogous, monochromatic, split‑complement, triadic, square), smart linear & radial gradients, with instant copy/export for designers and developers.

**Primary Objectives (MVP):**

1. Convert a single seed color into the required color schemes using perceptually sane math (OKLCH‑first).
2. Generate high‑quality **linear** and **radial** gradients with 2–5 stops and perceptual stop spacing.
3. Provide **EyeDropper** input and standard HEX/RGB/HSL fields with validation.
4. Enable one‑click **copy** (HEX/RGB/HSL/OKLCH) and **export** (SVG palette/gradients, PNG sprite, CSS variables, Tailwind snippet, JSON).
5. Include built‑in **accessibility** checks (WCAG 2.2 + APCA) with pass/fail badges.

**Why now / problem:** Existing tools are great for exploration but weak on **dev‑ready exports**, **OKLCH accuracy**, and **built‑in accessibility**. Designers and developers often bounce between multiple tools, manually converting formats and fixing contrast.

**Users:**

* **UI Designers** — explore palettes/gradients; export visual references.
* **Web Developers** — copy CSS/Tailwind/JSON; drop into codebases quickly.

**Key Outcomes:**

* <5s from seed → complete palette set & gradients
* 1‑click export/clipboard for common formats
* Majority of suggested pairs meet AA by default (with simple nudges available)

**Out of Scope (MVP):** Auth, team sharing/sync, Figma plugin, browser extension, brand token kits, batch seeds, ASE/ACO file formats (tentative).

---
