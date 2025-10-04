# 2) Tech Stack & Libraries

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
