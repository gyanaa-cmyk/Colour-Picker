# 5. Non-Functional Requirements

## **5.1 Performance**

* Generate complete palette and gradients **in under 200 ms** on mid-tier laptops.
* Initial load < 2 MB bundle (Vite build + code-splitting).
* All computations local; no external API latency.
* GPU-accelerated Canvas rendering for gradient previews.

## **5.2 Reliability**

* Offline-first PWA: full functionality without network connection.
* IndexedDB history persists across sessions.
* Palette data never leaves browser (no cloud calls).
* Graceful fallback when EyeDropper API unavailable.

## **5.3 Accessibility**

* Application itself must meet **WCAG 2.2 AA** (keyboard navigation, color contrast).
* Screen-reader friendly: ARIA labels for all interactive elements.
* Copy/export actions provide audible and visual feedback.

## **5.4 Security & Privacy**

* No personal data collection or telemetry (local analytics optional).
* Clipboard actions sandboxed; exports generated client-side only.
* CSP and HTTPS enforced for hosted deployment.

## **5.5 Maintainability**

* Modular architecture (React components + Zustand state).
* Linting & type safety with ESLint + TypeScript.
* Unit tests for color algorithms and export routines.

## **5.6 Scalability**

* Codebase supports extension (Figma plugin, brand-token engine) without rewrite.
* API-ready architecture for potential Pro tier sync later.


---
