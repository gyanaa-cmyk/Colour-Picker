import { useEffect, useState } from 'react'
import { useSchemeSlice } from '../../state/useSchemeSlice'
import { useSeedSlice } from '../../state/useSeedSlice'
import type { SchemeId } from '../../engine'
import { exportPalette, copyToClipboard } from '../../engine/export'

const SCHEMES: SchemeId[] = ['complementary', 'analogous', 'monochromatic', 'split', 'triadic', 'square']
const SCHEME_LABELS: Record<SchemeId, string> = {
    complementary: 'Complementary',
    analogous: 'Analogous',
    monochromatic: 'Monochromatic',
    split: 'Split',
    triadic: 'Triadic',
    square: 'Square',
}

export default function PaletteView() {
    const seed = useSeedSlice((s) => s.seed)
    const scheme = useSchemeSlice((s) => s.scheme)
    const setScheme = useSchemeSlice((s) => s.setScheme)
    const palette = useSchemeSlice((s) => s.palette)
    const recompute = useSchemeSlice((s) => s.recompute)

    useEffect(() => {
        recompute()
    }, [seed, scheme, recompute])

    const [msg, setMsg] = useState<string | null>(null)

    const doExport = async (type: 'svg' | 'png' | 'css' | 'json') => {
        if (!palette) return
        const out = exportPalette(palette, type)
        if (type === 'png') {
            // Open PNG in new tab
            window.open(out as string, '_blank')
            setMsg('PNG opened in new tab')
        } else {
            await copyToClipboard(out as string)
            setMsg(type.toUpperCase() + ' copied to clipboard')
        }
    }

    return (
        <div className="palette-card">
            <div role="group" aria-label="Select color scheme" className="scheme-row">
                {SCHEMES.map((id: SchemeId) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => setScheme(id)}
                        aria-pressed={scheme === id}
                        disabled={!seed}
                        className={scheme === id ? 'scheme-btn active' : 'scheme-btn'}
                    >
                        {SCHEME_LABELS[id]}
                    </button>
                ))}
            </div>

            {!seed && <small className="palette-note">Enter a seed color to generate palettes</small>}

            {palette && (
                <>
                    <div className="palette-swatches">
                        {palette.colors.map((c, idx) => (
                            <div
                                key={idx}
                                className="swatch-card"
                                style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    try {
                                        await copyToClipboard(c.hex)
                                        setMsg(`${c.hex} copied!`)
                                    } catch (e) {
                                        console.log(e)
                                        setMsg('Copy failed: Clipboard not available')
                                    }
                                    setTimeout(() => setMsg(null), 1500)
                                }}
                                title="Click to copy color"
                            >
                                <div
                                    role="img"
                                    aria-label={`swatch ${idx + 1} ${c.hex}`}
                                    className="swatch-color"
                                    style={{ background: c.hex }}
                                />
                                <code className="swatch-code">{c.hex}</code>
                            </div>
                        ))}
                    </div>
                    <div className="palette-export-row">
                        <span>Export:</span>
                        {(['svg', 'png', 'css', 'json'] as const).map(type => (
                            <button key={type} className="palette-btn" type="button" onClick={() => doExport(type)}>{type.toUpperCase()}</button>
                        ))}
                        {msg && <span className="palette-msg">{msg}</span>}
                    </div>
                </>
            )}
        </div>
    )
}
