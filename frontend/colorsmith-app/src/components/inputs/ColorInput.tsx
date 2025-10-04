import React, { useState } from 'react'
import { parseColor } from '../../engine/color-space'
import { useSeedSlice } from '../../state/useSeedSlice'
import { isEyeDropperSupported, pickColorWithEyeDropper } from '../../utils/eyedropper'
import CanvasPicker from './CanvasPicker'

export default function ColorInput() {
    const seed = useSeedSlice((s) => s.seed)
    const setSeed = useSeedSlice((s) => s.setSeed)

    const [hex, setHex] = useState(seed?.hex ?? '')
    const [rgb, setRgb] = useState('')
    const [hsl, setHsl] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onSubmit = (value: string) => {
        try {
            const c = parseColor(value)
            setSeed(c)
            setHex(c.hex)
            setError(null)
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : 'Invalid color'
            setError(msg)
        }
    }

    const onPick = async () => {
        const picked = await pickColorWithEyeDropper()
        if (picked) onSubmit(picked)
    }

    return (
        <div style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
            <label>
                HEX
                <input
                    value={hex}
                    placeholder="#aabbcc or #abc"
                    onChange={(e) => setHex(e.target.value)}
                    onBlur={() => hex && onSubmit(hex)}
                />
            </label>
            <label>
                RGB
                <input
                    value={rgb}
                    placeholder="rgb(255,0,0) or 255,0,0"
                    onChange={(e) => setRgb(e.target.value)}
                    onBlur={() => rgb && onSubmit(rgb)}
                />
            </label>
            <label>
                HSL
                <input
                    value={hsl}
                    placeholder="hsl(0,100%,50%) or 0,100,50"
                    onChange={(e) => setHsl(e.target.value)}
                    onBlur={() => hsl && onSubmit(hsl)}
                />
            </label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button type="button" onClick={() => hex && onSubmit(hex)}>Apply</button>
                {isEyeDropperSupported() ? (
                    <button type="button" onClick={onPick}>Pick from Screen</button>
                ) : (
                    <small>EyeDropper not supported — use image picker below</small>
                )}
            </div>
            {!isEyeDropperSupported() && (
                <CanvasPicker onPick={(h) => onSubmit(h)} />
            )}
            {seed?.hex && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, background: seed.hex, borderRadius: 4, border: '1px solid #ccc' }} />
                    <code>{seed.hex}</code>
                </div>
            )}
            {error && <div style={{ color: 'crimson' }}>{error}</div>}
        </div>
    )
}
