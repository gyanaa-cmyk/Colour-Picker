import { create } from 'zustand'
import type { Color } from './useSeedSlice'
import { generateGradient, type GradientKind, type Gradient } from '../engine/gradient'

type GradientState = {
    kind: GradientKind
    angle: number
    stops: Color[]
    gradient: Gradient | null
    setKind: (k: GradientKind) => void
    setAngle: (a: number) => void
    setStops: (s: Color[]) => void
    recompute: () => void
}

export const useGradientSlice = create<GradientState>((set, get) => ({
    kind: 'linear',
    angle: 90,
    stops: [],
    gradient: null,
    setKind: (k) => { set({ kind: k }); get().recompute() },
    setAngle: (a) => { set({ angle: a }); get().recompute() },
    setStops: (s) => { set({ stops: s }); get().recompute() },
    recompute: () => {
        const { stops, kind, angle } = get()
        if (!stops || stops.length < 2) return set({ gradient: null })
        set({ gradient: generateGradient(stops, kind, { angle }) })
    },
}))