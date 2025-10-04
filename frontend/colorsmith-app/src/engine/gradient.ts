import { converter, formatHex, type Oklch as CuloriOklch, type Color as CuloriColor } from 'culori'
import type { Color } from '../state/useSeedSlice'

export type GradientKind = 'linear' | 'radial'

export type Gradient = {
    kind: GradientKind
    angle?: number
    stops: Color[]
    css: string
    svg: string
}

const toOklchObj = (c: Color): CuloriOklch => ({ mode: 'oklch', l: c.oklch[0], c: c.oklch[1], h: c.oklch[2] })
const toRgb = converter('rgb')
const srgbInGamut = (c: CuloriOklch): boolean => {
    const rgb = toRgb(c as CuloriColor)
    return [rgb.r, rgb.g, rgb.b].every((v) => typeof v === 'number' && v >= 0 && v <= 1)
}
const clampChroma = (ok: CuloriOklch): CuloriOklch => {
    let c = ok.c ?? 0
    let tries = 0
    while (!srgbInGamut({ ...ok, c }) && c > 0.001 && tries < 24) {
        c *= 0.9
        tries++
    }
    return { ...ok, c }
}

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t
}

function interpolateOklch(a: CuloriOklch, b: CuloriOklch, t: number): CuloriOklch {
    // Interpolate l, c, h (h circular)
    const l = lerp(a.l ?? 0, b.l ?? 0, t)
    const c = lerp(a.c ?? 0, b.c ?? 0, t)
    let h0 = a.h ?? 0, h1 = b.h ?? 0
    let dh = h1 - h0
    if (Math.abs(dh) > 180) dh -= Math.sign(dh) * 360
    const h = (h0 + dh * t + 360) % 360
    return clampChroma({ mode: 'oklch', l, c, h })
}

function interpolateStops(stops: Color[], steps: number): Color[] {
    if (stops.length < 2) return []
    const result: Color[] = []
    for (let i = 0; i < stops.length - 1; i++) {
        const a = toOklchObj(stops[i])
        const b = toOklchObj(stops[i + 1])
        for (let s = 0; s < steps; s++) {
            const t = s / steps
            const ok = interpolateOklch(a, b, t)
            const hex = formatHex(ok as CuloriColor)
            result.push({ ...stops[i], hex, oklch: [ok.l ?? 0, ok.c ?? 0, ok.h ?? 0] })
        }
    }
    // Add last stop
    result.push(stops[stops.length - 1])
    return result
}

export function generateGradient(
    stops: Color[],
    kind: GradientKind,
    opts?: { angle?: number; center?: [number, number] }
): Gradient {
    // For preview, interpolate 32 steps between each stop
    const interp = interpolateStops(stops, 32)
    const colorStops = interp.map((c, i) => `${c.hex} ${(i / (interp.length - 1) * 100).toFixed(1)}%`).join(', ')
    let css = ''
    if (kind === 'linear') {
        const angle = opts?.angle ?? 90
        css = `linear-gradient(${angle}deg, ${colorStops})`
    } else {
        css = `radial-gradient(circle, ${colorStops})`
    }
    // SVG string (simple, not full-featured)
    let svg = ''
    if (kind === 'linear') {
        svg = `<svg width='320' height='64'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='0%'>${interp.map((c, i) => `<stop offset='${(i / (interp.length - 1) * 100).toFixed(1)}%' stop-color='${c.hex}'/>`).join('')}</linearGradient></defs><rect width='320' height='64' fill='url(#g)'/></svg>`
    } else {
        svg = `<svg width='64' height='64'><defs><radialGradient id='g'><stop offset='0%' stop-color='${interp[0].hex}'/>${interp.map((c, i) => `<stop offset='${(i / (interp.length - 1) * 100).toFixed(1)}%' stop-color='${c.hex}'/>`).join('')}</radialGradient></defs><rect width='64' height='64' fill='url(#g)'/></svg>`
    }
    return { kind, angle: opts?.angle, stops, css, svg }
}