# 6. UX Overview & Key Screens

## **6.1 UX Principles**

* **Speed & Clarity:** Minimal friction — from color input to full palette in one screen.
* **Visual Trust:** Large, well-spaced swatches and smooth gradients emphasize color accuracy.
* **Accessibility First:** Legible typography, high contrast, and keyboard-first usability.
* **Zero Setup:** No login, no configuration required to get results.

---

## **6.2 Primary User Flow**

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

## **6.3 Key Screens**

### **1. Home / Input Panel**

* Large input field for HEX/RGB/HSL.
* “Pick Color” button (EyeDropper API).
* Randomize & reset actions.
* Immediate preview of base color.

### **2. Palette Screen**

* Tabs for each scheme (Complementary, Analogous, etc.).
* Swatch grid with color name, HEX, copy icon.
* Tooltip toggles between HEX/RGB/HSL/OKLCH.
* Button: “Generate Gradients from This Palette.”

### **3. Gradient Builder**

* Canvas preview with draggable stops.
* Toggle: Linear / Radial.
* Angle slider + color stop count (2–5).
* Export snippet buttons: CSS, SVG, PNG.

### **4. Accessibility Panel**

* Contrast matrix for selected foreground/background pairs.
* Pass/fail icons (AA/AAA/APCA).
* Suggestion: “Lighten by +8 L to pass AA on white.”

### **5. Export / Share Modal**

* Format chooser: CSS / Tailwind / JSON / SVG / PNG.
* Copy-to-clipboard + download file.
* Shareable link with encoded params.

---

## **6.4 Microinteractions**

* Hover = show “Copy” tooltip.
* Press `C` copies HEX, `R` copies RGB.
* Toast confirms copied state.
* Palette save animation when added to history.


---
