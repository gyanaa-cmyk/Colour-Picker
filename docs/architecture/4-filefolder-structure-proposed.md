# 4) File/Folder Structure (proposed)

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
