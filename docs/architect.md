# ColorSmith — Front‑End Architecture

**Owner:** Architect (Winston)
**Audience:** FE engineers, QA, UX
**Scope:** MVP front‑end only (PWA, offline, no auth)

---

## 1) Architectural Overview

**Goal:** A fast, offline‑capable color utility that takes a single seed color and outputs palettes, gradients, and dev‑ready exports with built‑in accessibility checks.

**Core pillars:**

* **OKLCH‑first color math** with graceful fallbacks
* **Deterministic generation** → shareable URLs and reproducible outputs
* **Local‑first data** (history, settings) via IndexedDB
* **Composable UI** with React + Tailwind + Radix UI
* **Small, modular core** (engine) used by views and exports

---

## 2) Tech Stack & Libraries

* **Framework:** React 18 + Vite + TypeScript
* **Styling:** Tailwind CSS, Radix UI primitives, CSS variables for live theme
* **State:** Zustand (slices per domain) + URLSearchParams for share state
* **Color Engine:** `culori` **or** `colorjs.io` (OKLCH/OKLab/OKHSV/HSL, conversion)
* **Accessibility:** `apca-w3` and WCAG 2.2 contrast calculations (utility funcs)
* **PWA:** Workbox (service worker, offline caching), manifest.json
* **Storage:** IndexedDB via `idb` (fallback: localStorage)
* **SVG/Canvas:** Native SVG elements + Canvas 2D for PNG export
* **Testing:** Vitest + React Testing Library, Playwright for e2e
* **Lint/Format:** ESLint (typescript, react), Prettier

---

## 3) High‑Level Module Diagram

```
┌──────────────────────────┐
│           App            │  Routing + Layout + Global Providers
└─────────────┬────────────┘
              │
  ┌───────────┴───────────┐
  │       UI Views        │  (Home/Input, Palettes, Gradients, Export, A11y)
  └───────┬───────┬───────┘
          │       │
   ┌──────┴───┐ ┌──┴────────┐
   │  Engine  │ │  Storage  │  (IndexedDB history, settings)
   └──────┬───┘ └─────┬─────┘
          │           │
      ┌───┴────┐  ┌───┴────┐
      │Exports │  │A11y Calc│  (WCAG/APCA)
      └────────┘  └────────┘
```

---

## 4) File/Folder Structure (proposed)

```
src/
  app/
    App.tsx
    routes.tsx
    providers.tsx
  components/
    inputs/ColorInput.tsx
    palettes/PaletteView.tsx
    gradients/GradientBuilder.tsx
    export/ExportPanel.tsx
    a11y/AccessibilityPanel.tsx
    common/{SwatchCard, Tooltip, Toast}.tsx
  engine/
    color-space.ts        // conversions & parsing
    schemes.ts            // complementary/analogous/mono/split/triad/square
    gradients.ts          // linear/radial generation
    names.ts              // optional color naming
    index.ts              // public API
  state/
    useSeedSlice.ts
    useSchemeSlice.ts
    useGradientSlice.ts
    useExportSlice.ts
    useUiSlice.ts
  utils/
    clipboard.ts
    download.ts
    url.ts
    a11y.ts               // WCAG/APCA utils
    eyedropper.ts
  data/
    presets.ts            // angles, degree defaults
  pwa/
    sw.ts                 // Workbox config
    manifest.webmanifest
  styles/
    tailwind.css
  tests/
    unit/engine/*.test.ts
    e2e/*.spec.ts
```

---

## 5) Type Models

```ts
// Color representations (keep hex & oklch authoritative)
export type RGB = [number, number, number];
export type HSL = [number, number, number];
export type OKLCH = [number, number, number]; // l(0..1), c(0..~0.4), h(0..360)

export type Color = {
  hex: string;
  rgb: RGB;
  hsl: HSL;
  oklch: OKLCH;
  name?: string;
};

export type SchemeId =
  | 'complementary' | 'analogous' | 'monochromatic'
  | 'split' | 'triadic' | 'square';

export type Palette = {
  seed: Color;
  scheme: SchemeId;
  colors: Color[];
};

export type GradientStop = { color: Color; pos: number }; // 0..100
export type Gradient = { kind: 'linear'|'radial'; angle?: number; stops: GradientStop[] };
```

---

## 6) Color Engine Design

**Principles**

* Use **OKLCH** for hue rotation and interpolation; compute HEX/RGB/HSL for display/export.
* Clamp chroma to avoid out‑of‑gamut values; re‑project into sRGB where needed.
* Deterministic generators seeded by base hex and scheme config.

**Key APIs**

```ts
// engine/index.ts
export function parseColor(input: string): Color; // #abc, #aabbcc, rgb(), hsl()
export function toAllSpaces(hexOrColor: string|Color): Color; // populate rgb/hsl/oklch

export function generateScheme(seed: Color, scheme: SchemeId, opts?: {
  analogousDelta?: number; // default 30
  splitDelta?: number;     // default 150
  count?: number;          // mono steps
}): Palette;

export function buildGradient(seed: Color, mode: 'seed-complement'|'seed-analogous'|'triad'|'custom', kind: 'linear'|'radial', opts?:{
  angle?: number;          // linear only
  stops?: number;          // 2..5
}): Gradient;
```

**Algorithms (sketch)**

```ts
// schemes.ts
const rot = (h:number, d:number) => ( (h + d) % 360 + 360 ) % 360;

export function complementary(seed: Color): Color[] {
  const [l,c,h] = seed.oklch; return [seed, { ...seed, oklch:[l,c,rot(h,180)] }].map(toDisplay);
}

export function analogous(seed: Color, delta=30): Color[] {
  const [l,c,h] = seed.oklch; return [rot(h,-delta), h, rot(h,delta)].map(hh=> toDisplay({...seed, oklch:[l,c,hh]}));
}

export function monochromatic(seed: Color, count=5): Color[] {
  const [l,c,h] = seed.oklch; const steps = Array.from({length:count},(_,i)=> i/(count-1));
  return steps.map(t=> toDisplay({...seed, oklch:[ease(l,t), clampC(c), h]})); // ease(): curved luminance ramp
}
```

**Interpolation**

* Gradients interpolate in **OKLCH** between stop colors → convert to CSS `oklch()` when supported; otherwise output HSL fallback.
* Stop positions use perceptual spacing (`0, 37, 63, 100`) to avoid mid‑band flattening.

**Gamut Handling**

* Use culori’s `inGamut('srgb')` and `clampChroma()` utilities; if still out‑of‑gamut, reduce chroma proportionally.

---

## 7) State Management (Zustand)

* **seedSlice**: seed color, input format, validation state
* **schemeSlice**: active scheme id, scheme options, generated palette
* **gradientSlice**: kind (linear/radial), angle, stops[], generated gradient
* **exportSlice**: last export type, modal state
* **uiSlice**: toasts, theme, keyboard shortcut toggles

**URL Sync**

* Serialize: `?seed=%23A855F7&scheme=triadic&g=lin:135:3`
* Only persist minimal state for shareability; keep history in IndexedDB

---

## 8) UI Component Architecture

* **ColorInput**: text fields for HEX/RGB/HSL, EyeDropper button, validation messages
* **PaletteView**: tabs for schemes, swatch grid, copy icons, quick actions
* **GradientBuilder**: preview canvas/SVG, draggable stops, angle slider, linear/radial toggle
* **AccessibilityPanel**: contrast matrix, AA/AAA/APCA badges, suggestions
* **ExportPanel**: format tabs (CSS/Tailwind/JSON/SVG/PNG), preview and copy/download
* **Common**: `SwatchCard`, `Tooltip`, `Toast`, `PillTabs`, `SplitPane`

**Interaction Contracts**

* All components read/write only their slice via selectors → no prop drilling
* Copy actions emit `uiSlice.toast({type:'success', message:'Copied HEX'})`

---

## 9) Accessibility (App‑level)

* Keyboard map: `C` copy HEX, `R` copy RGB, `G` toggle gradient mode, `[`/`]` angle step
* Focus management: roving tabindex in swatch grid
* Contrast: App UI adheres to **AA**; indicators rely on icons + text (not color alone)

---

## 10) Performance & Bundling

* Target bundle < **2 MB** gzipped; code‑split heavy modules (`culori`, APCA) via dynamic import
* Memoize engine outputs with `(seed, scheme, opts)` keys
* Use **web workers** for APCA/WCAG matrix on large palettes to keep UI responsive
* Cache PNG exports and recent palettes in IndexedDB

---

## 11) PWA & Offline

* Static assets + engine cached by Workbox (Stale‑While‑Revalidate)
* Fallback page for offline; history list available offline
* Versioned caches with migration function to clean stale data

---

## 12) Error Handling & Edge Cases

* Invalid color input → inline error, disable generate
* EyeDropper unsupported → show upload‑image picker fallback
* Out‑of‑gamut after rotation → reduce chroma; warn via subtle badge
* PNG export failure (Safari memory) → suggest SVG/CSS alternative

---

## 13) Testing Strategy

* **Unit:** color conversions, scheme outputs, gradient interpolation, a11y ratios
* **Component:** palette grid behavior, copy/export, keyboard navigation
* **e2e:** primary flow (input → schemes → gradient → export → share URL)
* **Visual tests:** per‑browser snapshot of gradients (Playwright screenshot)

---

## 14) Example Snippets

```ts
// clipboard.ts
export const copyText = async (s: string) => navigator.clipboard.writeText(s);

// url.ts
export function encodeState({seed, scheme, gradient}: any){ /* ... */ }
export function decodeState(qs: string){ /* ... */ }

// a11y.ts (WCAG 2.2)
export function contrastRatio(rgb1: RGB, rgb2: RGB): number { /* ... */ }

// gradients.ts
export function linearFromColors(colors: Color[], angle=135): Gradient { /* ... */ }
```

---

## 15) Build & Tooling

* Vite + TS path aliases (`@engine`, `@state`, `@components`)
* Tailwind config with plugin to emit `oklch()` CSS if supported, else HSL fallbacks
* Git hooks: `lint-staged` + `prettier` on commit; CI runs unit + e2e smoke

---

## 16) Implementation Plan (MVP)

1. **Engine v1**: parse/convert, schemes, gradients (OKLCH), gamut clamp
2. **UI v1**: ColorInput → PaletteView → GradientBuilder
3. **Exports v1**: CSS/Tailwind/JSON; SVG palette grid; PNG sprite (canvas)
4. **A11y v1**: contrast matrix (WCAG, APCA), badges
5. **PWA**: offline cache, history store, URL share
6. **Polish**: keyboard shortcuts, toasts, perf passes, tests

**Milestone Acceptance**

* Deterministic outputs for given URL
* All P0 features clickable and tested
* Lighthouse ≥ 90, Axe pass, e2e smoke green

---

## 17) Open Technical Decisions

* Choose **culori** vs **colorjs.io** (bench & API ergonomics)
* Default degrees: analogous 30°, split 150° — configurable in settings?
* OKLCH CSS output gated behind `@supports (color: oklch(50% 0.1 30))` with HSL fallback

---

## 18) Future Extensions

* Color‑blind simulation (GPU shader or worker)
* Brand token generator (OKLCH ladders per semantic role)
* Figma plugin powered by the same engine (shared core)
