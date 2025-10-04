# 7. Exports & Handoff

## **7.1 Export Formats (MVP)**

| Format                      | Purpose                              | Example                                        | Notes                                     |
| --------------------------- | ------------------------------------ | ---------------------------------------------- | ----------------------------------------- |
| **SVG**                     | Visual palette + gradient defs       | `<linearGradient id=\"grad1\">...`             | Supports gradient previews, palette tiles |
| **PNG**                     | Bitmap sprite of palette or gradient | `palette-<seed>.png`                           | Export via `<canvas>` for offline use     |
| **CSS Variables**           | Developer-ready tokens               | `:root { --primary: #6750A4; }`                | Include color + gradient snippets         |
| **Tailwind Config Snippet** | Framework-ready tokens               | `theme.extend.colors = { primary: '#6750A4' }` | Ready to paste into `tailwind.config.js`  |
| **JSON**                    | Machine-readable palette data        | `[ { name, hex, rgb, hsl, oklch } ]`           | For future integrations or plugin sync    |

---

## **7.2 Clipboard Actions**

* Single-click copy for each color format (HEX, RGB, HSL, OKLCH).
* “Copy All” to copy full palette block (JSON or CSS vars).
* Visual + toast confirmation after each copy action.

---

## **7.3 Export Modal UX**

* **Tabs** for export type (SVG, PNG, CSS, Tailwind, JSON).
* **Buttons:** “Copy,” “Download,” “Open in New Tab.”
* Format preview pane (syntax-highlighted for CSS/JSON).
* Previews regenerate dynamically on color change.

---

## **7.4 File Naming**

```
/exports/
  palette-<scheme>-<seed>.svg
  palette-<scheme>-<seed>.png
  palette-<scheme>-<seed>.json
```

All file names sanitized to avoid special characters.

---

## **7.5 Integration Handoff**

* Developer handoff: include sample Tailwind and CSS exports in `README.md`.
* Designers: export PNG/SVG from the app directly for Figma uploads.
* Documentation: list example commands for automation (e.g., build export script later).

---
