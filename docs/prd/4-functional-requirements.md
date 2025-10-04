# 4. Functional Requirements

## **4.1 Core Features**

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

## **4.2 User Interactions**

* **Input Flow:** user enters color manually or via EyeDropper → preview updates immediately.
* **Scheme Selection:** choose scheme tabs/pills → dynamic swatches appear.
* **Gradient Selection:** toggle between linear/radial → display live gradient previews.
* **Copy & Export:** each swatch supports hover-to-copy; toolbar for bulk export.
* **Accessibility:** show contrast matrix for selected pair; click suggestions (“Adjust +L to pass AA”).
* **Sharing:** “Copy Link” copies permalink with encoded params.

---

## **4.3 Data Structures**

* Color model (`{hex, rgb, hsl, oklch}`)
* Palette object (`{seed, scheme, colors[]}`)
* Gradient object (`{kind, angle?, stops[]}`)

---

## **4.4 Technical Notes**

* Use `colorjs.io` or `culori` for color math.
* Store palette history locally (IndexedDB or localStorage).
* SVG/PNG generation via Canvas 2D.
* CSS/Tailwind export templates baked into FE.

---
