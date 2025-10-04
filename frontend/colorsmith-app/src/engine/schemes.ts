import { converter, formatHex, type Oklch as CuloriOklch, type Color as CuloriColor, type Rgb } from 'culori'
import type { Color } from '../state/useSeedSlice'
import { toAllSpaces } from './color-space'

const toOklchObj = (c: Color): CuloriOklch => ({ mode: 'oklch', l: c.oklch[0], c: c.oklch[1], h: c.oklch[2] })

const wrapHue = (h?: number): number => {
    if (h == null || Number.isNaN(h)) return 0
    let v = h % 360
    if (v < 0) v += 360
    return v
}

const rotateHue = (ok: CuloriOklch, delta: number): CuloriOklch => ({
    mode: 'oklch',
    l: ok.l ?? 0,
    c: ok.c ?? 0,
    h: wrapHue((ok.h ?? 0) + delta),
})

const toRgb = converter('rgb')
const srgbInGamut = (c: CuloriOklch): boolean => {
    const rgb = toRgb(c as CuloriColor) as Rgb
    const comps = [rgb?.r, rgb?.g, rgb?.b]
    return comps.every((v) => typeof v === 'number' && v >= 0 && v <= 1)
}

const ensureInSrgb = (ok: CuloriOklch): CuloriOklch => {
    // Reduce chroma progressively until in sRGB gamut
    if (srgbInGamut(ok)) return ok
    let c = ok.c ?? 0
    let tries = 0
    while (tries < 24) {
        c *= 0.9
        const candidate: CuloriOklch = { mode: 'oklch', l: ok.l ?? 0, c, h: ok.h }
        if (srgbInGamut(candidate)) return candidate
        tries++
    }
    return { mode: 'oklch', l: ok.l ?? 0, c: Math.max(0, Math.min(0.02, ok.c ?? 0)), h: ok.h }
}

const toColor = (ok: CuloriOklch): Color => {
    const hex = formatHex(ok as CuloriColor)
    return toAllSpaces(hex)
}

export const complementary = (seed: Color): Color[] => {
    const ok = toOklchObj(seed)
    const a = ensureInSrgb(ok)
    const b = ensureInSrgb(rotateHue(ok, 180))
    return [toColor(a), toColor(b)]
}

export const analogous = (seed: Color, delta = 30): Color[] => {
    const ok = toOklchObj(seed)
    const base = ensureInSrgb(ok)
    const left = ensureInSrgb(rotateHue(ok, -Math.abs(delta)))
    const right = ensureInSrgb(rotateHue(ok, Math.abs(delta)))
    return [toColor(left), toColor(base), toColor(right)]
}

export const split = (seed: Color, delta = 150): Color[] => {
    const ok = toOklchObj(seed)
    const base = ensureInSrgb(ok)
    const a = ensureInSrgb(rotateHue(ok, -Math.abs(delta)))
    const b = ensureInSrgb(rotateHue(ok, Math.abs(delta)))
    return [toColor(base), toColor(a), toColor(b)]
}

export const triadic = (seed: Color): Color[] => {
    const ok = toOklchObj(seed)
    const base = ensureInSrgb(ok)
    const a = ensureInSrgb(rotateHue(ok, -120))
    const b = ensureInSrgb(rotateHue(ok, 120))
    return [toColor(base), toColor(a), toColor(b)]
}

export const square = (seed: Color): Color[] => {
    const ok = toOklchObj(seed)
    const a = ensureInSrgb(ok)
    const b = ensureInSrgb(rotateHue(ok, 90))
    const c = ensureInSrgb(rotateHue(ok, 180))
    const d = ensureInSrgb(rotateHue(ok, 270))
    return [toColor(a), toColor(b), toColor(c), toColor(d)]
}

export const monochromatic = (seed: Color, count = 5): Color[] => {
    const ok = toOklchObj(seed)
    const l0 = Math.max(0.05, (ok.l ?? 0.5) - 0.25)
    const l1 = Math.min(0.98, (ok.l ?? 0.5) + 0.25)
    const n = Math.max(1, Math.floor(count))
    const arr: Color[] = []
    for (let i = 0; i < n; i++) {
        const t = n === 1 ? 0.5 : i / (n - 1)
        const l = l0 + (l1 - l0) * t
        const candidate: CuloriOklch = { mode: 'oklch', l, c: Math.min(ok.c ?? 0, 0.25), h: ok.h }
        arr.push(toColor(ensureInSrgb(candidate)))
    }
    return arr
}

export type SchemeId = 'complementary' | 'analogous' | 'monochromatic' | 'split' | 'triadic' | 'square'

export type Palette = {
    scheme: SchemeId
    colors: Color[]
}
