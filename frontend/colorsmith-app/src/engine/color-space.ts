import { parse, formatHex, converter, type Color as CuloriColor, type Rgb, type Hsl, type Oklch } from 'culori'
import type { Color, RGB, HSL, OKLCH } from '../state/useSeedSlice'

const toRgbTuple = (c: CuloriColor): RGB => {
    const conv = converter('rgb')
    const r = conv(c) as Rgb
    return [Math.round((r.r ?? 0) * 255), Math.round((r.g ?? 0) * 255), Math.round((r.b ?? 0) * 255)]
}

const toHslTuple = (c: CuloriColor): HSL => {
    const conv = converter('hsl')
    const h = conv(c) as Hsl
    return [Math.round(h.h ?? 0), Math.round((h.s ?? 0) * 100), Math.round((h.l ?? 0) * 100)]
}

const toOklchTuple = (c: CuloriColor): OKLCH => {
    const conv = converter('oklch')
    const o = conv(c) as Oklch
    return [o.l ?? 0, o.c ?? 0, (o.h ?? 0)]
}

export function toAllSpaces(input: string | Color): Color {
    if (typeof input !== 'string') {
        // Assume already a Color; normalize hex
        return { ...input, hex: input.hex.toLowerCase() }
    }
    const parsed = parse(input)
    if (!parsed) {
        throw new Error('Invalid color input')
    }
    const hex = formatHex(parsed)
    return {
        hex,
        rgb: toRgbTuple(parsed),
        hsl: toHslTuple(parsed),
        oklch: toOklchTuple(parsed),
    }
}

export function parseColor(input: string): Color {
    // accept shorthand like `255,0,0` or `360,100,50`
    const trimmed = input.trim()
    const rgbMatch = trimmed.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/)
    const hslMatch = trimmed.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/)
    // culori can parse rgb() and hsl() and hex directly
    const candidates = [trimmed]
    if (rgbMatch) candidates.push(`rgb(${trimmed})`)
    if (hslMatch) candidates.push(`hsl(${trimmed})`)

    for (const c of candidates) {
        try {
            return toAllSpaces(c)
        } catch {
            // try next
        }
    }
    throw new Error('Unsupported color format')
}
