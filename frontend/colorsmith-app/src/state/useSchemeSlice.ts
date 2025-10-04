import { create } from 'zustand'
import type { Color } from './useSeedSlice'
import { generateScheme, type Palette, type SchemeId } from '../engine'
import { useSeedSlice } from './useSeedSlice'

type SchemeState = {
    scheme: SchemeId
    palette: Palette | null
    setScheme: (id: SchemeId) => void
    recompute: () => void
}

export const useSchemeSlice = create<SchemeState>((set, get) => ({
    scheme: 'complementary',
    palette: null,
    setScheme: (id) => {
        set({ scheme: id })
        get().recompute()
    },
    recompute: () => {
        const seed = useSeedSlice.getState().seed as Color | null
        if (!seed) return set({ palette: null })
        const scheme = get().scheme
        const palette = generateScheme(seed, scheme)
        set({ palette })
    },
}))
