import type { Color } from '../state/useSeedSlice'
import { analogous, complementary, monochromatic, split, triadic, square, type SchemeId, type Palette } from './schemes'

export function generateScheme(seed: Color, scheme: SchemeId, opts?: {
    analogousDelta?: number
    splitDelta?: number
    count?: number
}): Palette {
    switch (scheme) {
        case 'complementary':
            return { scheme, colors: complementary(seed) }
        case 'analogous':
            return { scheme, colors: analogous(seed, opts?.analogousDelta ?? 30) }
        case 'monochromatic':
            return { scheme, colors: monochromatic(seed, opts?.count ?? 5) }
        case 'split':
            return { scheme, colors: split(seed, opts?.splitDelta ?? 150) }
        case 'triadic':
            return { scheme, colors: triadic(seed) }
        case 'square':
            return { scheme, colors: square(seed) }
        default:
            // exhaustive guard
            throw new Error('Unknown scheme')
    }
}

export type { SchemeId, Palette } from './schemes'
