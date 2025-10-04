# 8) UI Component Architecture

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
