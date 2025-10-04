import { describe, it, expect } from 'vitest'
import { exportPalette, exportGradient } from '../../../engine/export'
import type { Palette } from '../../../engine/schemes'
import type { Gradient } from '../../../engine/gradient'

const palette: Palette = {
    scheme: 'complementary',
    colors: [
        { hex: '#ff0000', rgb: [255, 0, 0], hsl: [0, 100, 50], oklch: [0.6, 0.2, 30] },
        { hex: '#00ff00', rgb: [0, 255, 0], hsl: [120, 100, 50], oklch: [0.8, 0.2, 120] },
    ]
}
const gradient: Gradient = {
    kind: 'linear',
    angle: 90,
    stops: palette.colors,
    css: 'linear-gradient(90deg, #ff0000, #00ff00)',
    svg: '<svg>...</svg>'
}

describe('exportPalette', () => {
    it('exports SVG', () => {
        const svg = exportPalette(palette, 'svg')
        expect(typeof svg).toBe('string')
        expect(svg).toContain('<svg')
    })
    it('exports CSS', () => {
        const css = exportPalette(palette, 'css')
        expect(css).toContain('--color1: #ff0000;')
    })
    it('exports JSON', () => {
        const json = exportPalette(palette, 'json')
        expect(json).toContain('"scheme"')
    })
})

describe('exportGradient', () => {
    it('exports SVG', () => {
        const svg = exportGradient(gradient, 'svg')
        expect(typeof svg).toBe('string')
        expect(svg).toContain('<svg')
    })
    it('exports CSS', () => {
        const css = exportGradient(gradient, 'css')
        expect(css).toContain('linear-gradient')
    })
    it('exports JSON', () => {
        const json = exportGradient(gradient, 'json')
        expect(json).toContain('"kind"')
    })
})