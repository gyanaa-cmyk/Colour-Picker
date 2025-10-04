import { useState } from 'react'
import { parseColor } from '../../engine/color-space'
import { useSeedSlice } from '../../state/useSeedSlice'
import { isEyeDropperSupported, pickColorWithEyeDropper } from '../../utils/eyedropper'
import CanvasPicker from './CanvasPicker'

export default function ColorInput() {
    const seed = useSeedSlice((s) => s.seed)
    const setSeed = useSeedSlice((s) => s.setSeed)

    const [hex, setHex] = useState(seed?.hex ?? '#aabbcc')
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
        <div className="color-card" style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="color-input-vertical" style={{ width: '100%', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, width: '100%' }}>
                    <input
                        className="color-picker"
                        type="color"
                        value={hex.startsWith('#') ? hex : '#aabbcc'}
                        onChange={e => {
                            setHex(e.target.value)
                            onSubmit(e.target.value)
                        }}
                        aria-label="Pick color"
                        style={{ width: 72, height: 72, minWidth: 72, minHeight: 72, border: 'none', background: 'none', boxShadow: '0 2px 8px 0 rgba(60,60,60,0.10)' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
                    <label className="color-label" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        HEX
                        <input
                            className="color-input"
                            value={hex}
                            type="text"
                            placeholder="#aabbcc or #abc"
                            onChange={(e) => setHex(e.target.value)}
                            onBlur={() => hex && onSubmit(hex)}
                            style={{ width: 220, textAlign: 'center' }}
                        />
                    </label>
                    <label className="color-label" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        RGB
                        <input
                            className="color-input"
                            value={rgb}
                            placeholder="rgb(255,0,0) or 255,0,0"
                            onChange={(e) => setRgb(e.target.value)}
                            onBlur={() => rgb && onSubmit(rgb)}
                            style={{ width: 220, textAlign: 'center' }}
                        />
                    </label>
                    <label className="color-label" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        HSL
                        <input
                            className="color-input"
                            value={hsl}
                            placeholder="hsl(0,100%,50%) or 0,100,50"
                            onChange={(e) => setHsl(e.target.value)}
                            onBlur={() => hsl && onSubmit(hsl)}
                            style={{ width: 220, textAlign: 'center' }}
                        />
                    </label>
                </div>
            </div>
            <div className="color-actions" style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <button className="color-btn" type="button" style={{ minWidth: 120 }} onClick={() => hex && onSubmit(hex)}>Apply</button>
                {isEyeDropperSupported() && (
                    <button className="color-btn" type="button" onClick={onPick}>Pick from Screen</button>
                )}
                {!isEyeDropperSupported() && (
                    <div style={{ marginTop: 4 }}>
                        <small className="color-note">EyeDropper not supported — use image picker below</small>
                    </div>
                )}
            </div>
            {!isEyeDropperSupported() && (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <CanvasPicker onPick={(h) => onSubmit(h)} />
                </div>
            )}
            {error && <div className="color-error">{error}</div>}
        </div>
    )
}
