# 5) Type Models

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
