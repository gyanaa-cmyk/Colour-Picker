# 1) Architectural Overview

**Goal:** A fast, offline‑capable color utility that takes a single seed color and outputs palettes, gradients, and dev‑ready exports with built‑in accessibility checks.

**Core pillars:**

* **OKLCH‑first color math** with graceful fallbacks
* **Deterministic generation** → shareable URLs and reproducible outputs
* **Local‑first data** (history, settings) via IndexedDB
* **Composable UI** with React + Tailwind + Radix UI
* **Small, modular core** (engine) used by views and exports

---
