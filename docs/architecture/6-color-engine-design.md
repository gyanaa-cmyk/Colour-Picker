# 6) Color Engine Design

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
