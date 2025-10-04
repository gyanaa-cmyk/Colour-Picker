import { describe, it, expect } from 'vitest'
import { parseColor } from '../../../engine/color-space'

describe('parseColor', () => {
    it('parses hex', () => {
        const c = parseColor('#ff0000')
        expect(c.hex.toLowerCase()).toBe('#ff0000')
    })

    it('parses rgb function and shorthand', () => {
        const c1 = parseColor('rgb(0, 128, 0)')
        const c2 = parseColor('0,128,0')
        expect(c1.hex).toBeDefined()
        expect(c2.hex).toBeDefined()
    })

    it('parses hsl function and shorthand', () => {
        const c1 = parseColor('hsl(240,100%,50%)')
        const c2 = parseColor('240,100,50')
        expect(c1.hex).toBeDefined()
        expect(c2.hex).toBeDefined()
    })

    it('rejects invalid inputs', () => {
        expect(() => parseColor('not-a-color')).toThrow()
    })
})
