import { create } from 'zustand'

export type RGB = [number, number, number]
export type HSL = [number, number, number]
export type OKLCH = [number, number, number]

export type Color = {
    hex: string
    rgb: RGB
    hsl: HSL
    oklch: OKLCH
    name?: string
}

type SeedState = {
    seed: Color | null
    setSeed: (c: Color) => void
}

export const useSeedSlice = create<SeedState>((set) => ({
    seed: null,
    setSeed: (c) => set({ seed: c }),
}))
