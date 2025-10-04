export type EyeDropperResult = { sRGBHex: string }

declare global {
    interface Window {
        EyeDropper?: new () => { open: () => Promise<EyeDropperResult> }
    }
}

export const isEyeDropperSupported = () => typeof window !== 'undefined' && !!window.EyeDropper

export async function pickColorWithEyeDropper(): Promise<string | null> {
    if (!isEyeDropperSupported()) return null
    const eye = new window.EyeDropper!()
    const res = await eye.open()
    return res.sRGBHex
}
