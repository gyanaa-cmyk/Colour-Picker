import { describe, it, expect } from 'vitest'
import { toAllSpaces } from '../../../engine/color-space'
import { analogous, complementary, monochromatic, split, triadic, square } from '../../../engine/schemes'

const seed = toAllSpaces('#ff0000') // pure red

const hue = (hex: string) => toAllSpaces(hex).oklch[2]

describe('schemes', () => {
    it('complementary returns 2 colors with ~180 deg separation', () => {
        const [a, b] = complementary(seed)
        const d = Math.abs(hue(a.hex) - hue(b.hex))
        const circular = Math.min(d, 360 - d)
        expect(Math.round(circular)).toBeGreaterThanOrEqual(178)
        expect(Math.round(circular)).toBeLessThanOrEqual(182)
    })

    it('analogous returns 3 colors with +/- delta', () => {
        const arr = analogous(seed, 30)
        expect(arr.length).toBe(3)
    })

    it('split-complement returns 3 colors', () => {
        const arr = split(seed, 150)
        expect(arr.length).toBe(3)
    })

    it('triadic returns 3 colors', () => {
        const arr = triadic(seed)
        expect(arr.length).toBe(3)
    })

    it('square returns 4 colors', () => {
        const arr = square(seed)
        expect(arr.length).toBe(4)
    })

    it('monochromatic returns N colors and stays in gamut', () => {
        const arr = monochromatic(seed, 5)
        expect(arr.length).toBe(5)
        for (const c of arr) {
            const [r, g, b] = toAllSpaces(c.hex).rgb
            expect(r).toBeGreaterThanOrEqual(0)
            expect(r).toBeLessThanOrEqual(255)
            expect(g).toBeGreaterThanOrEqual(0)
            expect(g).toBeLessThanOrEqual(255)
            expect(b).toBeGreaterThanOrEqual(0)
            expect(b).toBeLessThanOrEqual(255)
        }
    })
})
