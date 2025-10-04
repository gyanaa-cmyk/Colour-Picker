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
        // Download as file for all types
        let blob: Blob
        let filename = `palette.${type}`
        if (type === 'svg') {
            blob = new Blob([out as string], { type: 'image/svg+xml' })
        } else if (type === 'css') {
            blob = new Blob([out as string], { type: 'text/css' })
        } else if (type === 'json') {
            blob = new Blob([out as string], { type: 'application/json' })
        } else if (type === 'png') {
            // out is a data URL, convert to Blob
            const dataUrl = out as string
            const byteString = atob(dataUrl.split(',')[1])
            const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0]
            const ab = new ArrayBuffer(byteString.length)
            const ia = new Uint8Array(ab)
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
            }
            blob = new Blob([ab], { type: mimeString })
        } else {
            blob = new Blob([out as string])
        }
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        }, 100)
        setMsg(type.toUpperCase() + ' downloaded')
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
                        {msg && <span className="palette-msg">{msg}</span>}
                        <div>
                            <span>Export:</span>
                            {(['svg', 'png', 'css', 'json'] as const).map(type => (
                                <button key={type} className="palette-btn" type="button" onClick={() => doExport(type)}>{type.toUpperCase()}</button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
