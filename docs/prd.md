# ColorSmith — MVP Product Requirements Document (PRD)

**Version:** v0.1 (2025‑10‑04)
**Audience:** Engineering, UX, and QA (internal)
**Focus:** MVP scope (web app, no auth)

---

## 1. Product Overview & Objectives

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

## 2. Goals & Non‑Goals

### **Goals**

1. **Deliver a functional color-generation engine** supporting all six primary schemes (complementary, analogous, monochromatic, split-complement, triadic, square).
2. **Produce perceptually balanced gradients** (linear + radial) with configurable stop counts and OKLCH interpolation.
3. **Offer frictionless UX** — single-input workflow, instant results, one-click copy/export.
4. **Enable developer-ready outputs** (CSS vars, Tailwind snippet, JSON palette, SVG/PNG assets).
5. **Maintain accessibility parity** — WCAG 2.2 AA + APCA pass/fail for all palette pairs.
6. **Perform fully offline in browser** (no server round-trips).
7. **Ship as a responsive PWA** with local palette history and shareable URLs.

### **Non-Goals (MVP)**

* Authentication, user accounts, or cloud sync.
* Batch palette generation or multi-seed comparison.
* Figma/VS Code/Browser-extension integrations.
* Advanced color-blind simulation or brand-token automation (Phase 2).
* Paid subscription flows or monetization mechanics.

---

## 3. User Personas & JTBD

### **Primary Personas**

#### 🧠 **UI Designer – “Lena the Visual Explorer”**

* **Goals:** Quickly test harmonious palettes and gradients for a design concept.
* **Pain Points:** Manual color wheel juggling, inconsistent gradient rendering, weak accessibility insights.
* **Needs:** Fast iteration, intuitive palette visualization, export for Figma/hand-off, built-in contrast info.
* **MVP Wins:** EyeDropper + instant schemes + export PNG/SVG; no-login friction.

#### 💻 **Front-End Developer – “Arun the Integrator”**

* **Goals:** Translate palette/gradients into code assets fast; ensure accessible contrast.
* **Pain Points:** Switching between design tools and code, manual HEX ↔ RGB conversions, missing Tailwind/CSS vars.
* **Needs:** Copy/paste-ready snippets, shareable URLs for teammates, a11y checks.
* **MVP Wins:** Tailwind snippet export, CSS vars, JSON output, AA+ suggestions.

#### 🧩 **Brand or Marketing Designer – “Kim the Color Guardian”**

* **Goals:** Validate new color directions align with brand look while meeting accessibility.
* **Pain Points:** Inconsistent tone hierarchy, risky color combos.
* **Needs:** Quick visualization of variants, contrast testing, palette lock around brand hue.
* **MVP Wins:** Monochrome and analogous sets, contrast matrix.

---

### **Jobs to be Done**

1. “When designing a new interface, I want to input one brand color and get matching palette ideas so I can iterate faster.”
2. “When implementing design tokens, I want one-click exports for CSS/Tailwind so I can stay in flow.”
3. “When checking color accessibility, I want automatic contrast results so I can fix issues early.”

---

## 4. Functional Requirements

### **4.1 Core Features**

| Feature                     | Description                                                                                                                                 | Priority | Owner |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----- |
| **Color Input**             | Accept HEX, RGB, HSL; validate formats; EyeDropper tool via native API with fallback (upload + canvas pick).                                | P0       | FE    |
| **Scheme Generation**       | Compute complementary, analogous (±30°), monochromatic, split-complement (±150°), triadic (±120°), square (±90°) using OKLCH hue rotations. | P0       | Core  |
| **Gradient Builder**        | Generate linear & radial gradients with 2–5 stops, perceptually spaced via OKLCH interpolation.                                             | P0       | Core  |
| **Export Options**          | Export palettes & gradients to SVG, PNG, CSS variables, Tailwind config, JSON; enable copy-to-clipboard.                                    | P0       | FE    |
| **Accessibility Checker**   | Calculate WCAG 2.2 AA/AAA and APCA contrast ratios; tag passes/fails with visual indicators.                                                | P1       | FE    |
| **Shareable URLs**          | Encode state (seed + scheme + gradient) into URL params.                                                                                    | P1       | FE    |
| **Responsive UI / PWA**     | Responsive grid layout, offline support via Workbox, palette history in IndexedDB.                                                          | P1       | FE    |
| **Keyboard & a11y Support** | Focus rings, copy shortcuts, aria labels.                                                                                                   | P2       | FE    |

---

### **4.2 User Interactions**

* **Input Flow:** user enters color manually or via EyeDropper → preview updates immediately.
* **Scheme Selection:** choose scheme tabs/pills → dynamic swatches appear.
* **Gradient Selection:** toggle between linear/radial → display live gradient previews.
* **Copy & Export:** each swatch supports hover-to-copy; toolbar for bulk export.
* **Accessibility:** show contrast matrix for selected pair; click suggestions (“Adjust +L to pass AA”).
* **Sharing:** “Copy Link” copies permalink with encoded params.

---

### **4.3 Data Structures**

* Color model (`{hex, rgb, hsl, oklch}`)
* Palette object (`{seed, scheme, colors[]}`)
* Gradient object (`{kind, angle?, stops[]}`)

---

### **4.4 Technical Notes**

* Use `colorjs.io` or `culori` for color math.
* Store palette history locally (IndexedDB or localStorage).
* SVG/PNG generation via Canvas 2D.
* CSS/Tailwind export templates baked into FE.

---

## 5. Non-Functional Requirements

### **5.1 Performance**

* Generate complete palette and gradients **in under 200 ms** on mid-tier laptops.
* Initial load < 2 MB bundle (Vite build + code-splitting).
* All computations local; no external API latency.
* GPU-accelerated Canvas rendering for gradient previews.

### **5.2 Reliability**

* Offline-first PWA: full functionality without network connection.
* IndexedDB history persists across sessions.
* Palette data never leaves browser (no cloud calls).
* Graceful fallback when EyeDropper API unavailable.

### **5.3 Accessibility**

* Application itself must meet **WCAG 2.2 AA** (keyboard navigation, color contrast).
* Screen-reader friendly: ARIA labels for all interactive elements.
* Copy/export actions provide audible and visual feedback.

### **5.4 Security & Privacy**

* No personal data collection or telemetry (local analytics optional).
* Clipboard actions sandboxed; exports generated client-side only.
* CSP and HTTPS enforced for hosted deployment.

### **5.5 Maintainability**

* Modular architecture (React components + Zustand state).
* Linting & type safety with ESLint + TypeScript.
* Unit tests for color algorithms and export routines.

### **5.6 Scalability**

* Codebase supports extension (Figma plugin, brand-token engine) without rewrite.
* API-ready architecture for potential Pro tier sync later.


---

## 6. UX Overview & Key Screens

### **6.1 UX Principles**

* **Speed & Clarity:** Minimal friction — from color input to full palette in one screen.
* **Visual Trust:** Large, well-spaced swatches and smooth gradients emphasize color accuracy.
* **Accessibility First:** Legible typography, high contrast, and keyboard-first usability.
* **Zero Setup:** No login, no configuration required to get results.

---

### **6.2 Primary User Flow**

```
[Landing Page]
  ↓
[Color Input]
  ↓
[Palette View]
  → switch scheme (complementary, analogous, etc.)
  → copy swatch / export
  ↓
[Gradient View]
  → adjust angle / stops
  ↓
[Accessibility Panel]
  → contrast table, AA/AAA tags, adjustment suggestions
  ↓
[Export Modal]
  → select format (CSS, SVG, PNG, JSON)
  ↓
[Share URL or Save Local]
```

---

### **6.3 Key Screens**

#### **1. Home / Input Panel**

* Large input field for HEX/RGB/HSL.
* “Pick Color” button (EyeDropper API).
* Randomize & reset actions.
* Immediate preview of base color.

#### **2. Palette Screen**

* Tabs for each scheme (Complementary, Analogous, etc.).
* Swatch grid with color name, HEX, copy icon.
* Tooltip toggles between HEX/RGB/HSL/OKLCH.
* Button: “Generate Gradients from This Palette.”

#### **3. Gradient Builder**

* Canvas preview with draggable stops.
* Toggle: Linear / Radial.
* Angle slider + color stop count (2–5).
* Export snippet buttons: CSS, SVG, PNG.

#### **4. Accessibility Panel**

* Contrast matrix for selected foreground/background pairs.
* Pass/fail icons (AA/AAA/APCA).
* Suggestion: “Lighten by +8 L to pass AA on white.”

#### **5. Export / Share Modal**

* Format chooser: CSS / Tailwind / JSON / SVG / PNG.
* Copy-to-clipboard + download file.
* Shareable link with encoded params.

---

### **6.4 Microinteractions**

* Hover = show “Copy” tooltip.
* Press `C` copies HEX, `R` copies RGB.
* Toast confirms copied state.
* Palette save animation when added to history.


---

## 7. Exports & Handoff

### **7.1 Export Formats (MVP)**

| Format                      | Purpose                              | Example                                        | Notes                                     |
| --------------------------- | ------------------------------------ | ---------------------------------------------- | ----------------------------------------- |
| **SVG**                     | Visual palette + gradient defs       | `<linearGradient id=\"grad1\">...`             | Supports gradient previews, palette tiles |
| **PNG**                     | Bitmap sprite of palette or gradient | `palette-<seed>.png`                           | Export via `<canvas>` for offline use     |
| **CSS Variables**           | Developer-ready tokens               | `:root { --primary: #6750A4; }`                | Include color + gradient snippets         |
| **Tailwind Config Snippet** | Framework-ready tokens               | `theme.extend.colors = { primary: '#6750A4' }` | Ready to paste into `tailwind.config.js`  |
| **JSON**                    | Machine-readable palette data        | `[ { name, hex, rgb, hsl, oklch } ]`           | For future integrations or plugin sync    |

---

### **7.2 Clipboard Actions**

* Single-click copy for each color format (HEX, RGB, HSL, OKLCH).
* “Copy All” to copy full palette block (JSON or CSS vars).
* Visual + toast confirmation after each copy action.

---

### **7.3 Export Modal UX**

* **Tabs** for export type (SVG, PNG, CSS, Tailwind, JSON).
* **Buttons:** “Copy,” “Download,” “Open in New Tab.”
* Format preview pane (syntax-highlighted for CSS/JSON).
* Previews regenerate dynamically on color change.

---

### **7.4 File Naming**

```
/exports/
  palette-<scheme>-<seed>.svg
  palette-<scheme>-<seed>.png
  palette-<scheme>-<seed>.json
```

All file names sanitized to avoid special characters.

---

### **7.5 Integration Handoff**

* Developer handoff: include sample Tailwind and CSS exports in `README.md`.
* Designers: export PNG/SVG from the app directly for Figma uploads.
* Documentation: list example commands for automation (e.g., build export script later).

---

## 8. Accessibility

### **8.1 Application Accessibility**

* The app itself must conform to **WCAG 2.2 AA** standards.
* Support full keyboard navigation:

  * `Tab` → cycle through interactive elements
  * `Enter`/`Space` → activate actions
  * `Esc` → close modals
* Provide ARIA labels and live region announcements for dynamic elements (copy success, export confirmation).
* Maintain **contrast ratio ≥ 4.5:1** for all UI text on backgrounds.
* Ensure all color-coded indicators (e.g., pass/fail) have non-color cues (icons or labels).

---

### **8.2 Color Output Accessibility**

* **Contrast Calculation:**

  * Compute both **WCAG 2.2 contrast ratios** and **APCA (Advanced Perceptual Contrast Algorithm)**.
  * Show pass/fail badges for AA (normal), AAA (enhanced), and APCA thresholds.
* **Contrast Matrix:**

  * Display n×n table comparing all palette colors as foreground vs background.
  * Highlight failing pairs and suggest closest compliant adjustments.
* **Auto-suggestive Fixes:**

  * Recommend luminance adjustments: e.g., “Increase L by +6 to reach AA.”
* **Safe Pairing Highlight:**

  * Show top 3 foreground/background pairs that achieve AAA contrast.
* **Exported Metadata:**

  * Include contrast results and compliance levels in JSON export for automated QA tools.

---

### **8.3 Testing & Validation**

* Accessibility testing using **axe-core** and **Lighthouse** automated audits.
* Manual keyboard testing and screen reader review (NVDA / VoiceOver).
* Periodic revalidation with WCAG and APCA library updates.


---

## 9. Metrics & Telemetry

### **9.1 Success Metrics**

| Metric                              | Target                                        | Purpose                                           |
| ----------------------------------- | --------------------------------------------- | ------------------------------------------------- |
| **Time to Palette**                 | < 5 seconds from color input to full render   | Measures UX responsiveness and compute efficiency |
| **Export/Copy Actions per Session** | ≥ 3                                           | Indicates active value generation                 |
| **Accessibility Pass Rate**         | ≥ 80 % AA compliance for generated palettes   | Validates color algorithm effectiveness           |
| **Retention (Saved Palettes)**      | ≥ 30 % of sessions use “Save/History” feature | Measures user satisfaction and utility            |
| **Crash-Free Sessions**             | 99 %+                                         | Confirms client-side stability                    |

---

### **9.2 Telemetry (Optional / Privacy-Safe)**

* Collect only **anonymous aggregate events**, e.g.:

  * Palette generated (scheme, format, success time)
  * Export action triggered
  * Accessibility panel opened
* No color data or HEX values logged.
* Analytics toggle: **off by default**, user-controlled.

---

### **9.3 QA & Internal Metrics**

* Unit test coverage ≥ 85 % on color engine and exports.
* Manual QA checklist before release (PWA installability, a11y, offline mode).
* Lighthouse performance score ≥ 90 on desktop/mobile.

---

## 10. Risks & Open Questions

### **10.1 Technical Risks**

| Risk                                    | Impact | Mitigation                                                                         |
| --------------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| **Browser EyeDropper API unsupported**  | Medium | Implement fallback (upload image → pick from canvas).                              |
| **OKLCH/OKLAB conversion inaccuracies** | Low    | Use well-tested libraries (`colorjs.io`, `culori`); validate with sample datasets. |
| **Export performance for PNG/SVG**      | Medium | Use offscreen canvas + async worker; limit gradient resolution.                    |
| **IndexedDB failures in Safari**        | Low    | Graceful fallback to `localStorage` with size cap.                                 |
| **APCA/WCAG computation complexity**    | Low    | Cache intermediate luminance values; async compute in web worker.                  |

---

### **10.2 UX & Product Risks**

| Risk                                         | Impact | Mitigation                                                               |
| -------------------------------------------- | ------ | ------------------------------------------------------------------------ |
| **Feature overload in MVP**                  | Medium | Stick to 6 schemes + 2 gradient types; delay brand tools and simulators. |
| **Accessibility misinterpretation by users** | Low    | Provide tooltips explaining AA/AAA/APCA indicators.                      |
| **Visual mismatch between browsers**         | Medium | Use OKLCH as primary color space; provide CSS fallbacks.                 |
| **Copy/export UX friction**                  | Low    | Add visible feedback and keyboard shortcuts.                             |

---

### **10.3 Open Questions**

1. Should OKLCH values be shown prominently by default, or kept behind a toggle for developers only?
2. Will accessibility metrics (WCAG vs APCA) display both simultaneously or one selectable option?
3. Should we include a “contrast-safe auto-adjust” feature in MVP or defer to v1.1?
4. Do we need built-in palette naming (e.g., Primary/Secondary) or leave it manual for MVP?
5. Will PNG exports support transparent backgrounds or fixed color surfaces?

