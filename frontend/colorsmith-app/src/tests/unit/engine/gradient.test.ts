import { describe, it, expect } from 'vitest'
import { generateGradient } from '../../../engine/gradient'
import type { RGB, HSL, OKLCH } from '../../../state/useSeedSlice'

const stops = [
    { hex: '#ff0000', rgb: [255, 0, 0] as RGB, hsl: [0, 100, 50] as HSL, oklch: [0.627, 0.257, 29.2] as OKLCH },
    { hex: '#00ff00', rgb: [0, 255, 0] as RGB, hsl: [120, 100, 50] as HSL, oklch: [0.877, 0.231, 136.0] as OKLCH },
    { hex: '#0000ff', rgb: [0, 0, 255] as RGB, hsl: [240, 100, 50] as HSL, oklch: [0.452, 0.322, 264.0] as OKLCH },
]

describe('generateGradient', () => {
    it('generates linear gradient CSS string', () => {
        const g = generateGradient(stops, 'linear', { angle: 45 })
        expect(g.css.startsWith('linear-gradient(45deg')).toBe(true)
        // Should start with a color stop and end with the last stop
        const stopsArr = g.css.match(/#[0-9a-f]{6}/g)
        expect(stopsArr?.length).toBeGreaterThan(2)
        expect(g.css.endsWith(`${stopsArr?.[stopsArr.length - 1]} 100.0%)`)).toBe(true)
    })
    it('generates radial gradient CSS string', () => {
        const g = generateGradient(stops, 'radial')
        expect(g.css).toContain('radial-gradient')
    })
    it('generates SVG string', () => {
        const g = generateGradient(stops, 'linear', { angle: 0 })
        expect(g.svg).toContain('<svg')
        expect(g.svg).toContain('<linearGradient')
    })
})