import { useEffect } from 'react'
import { useSchemeSlice } from '../../state/useSchemeSlice'
import { useSeedSlice } from '../../state/useSeedSlice'
import type { SchemeId } from '../../engine'

const SCHEMES: SchemeId[] = ['complementary', 'analogous', 'monochromatic', 'split', 'triadic', 'square']

export default function PaletteView() {
    const seed = useSeedSlice((s) => s.seed)
    const scheme = useSchemeSlice((s) => s.scheme)
    const setScheme = useSchemeSlice((s) => s.setScheme)
    const palette = useSchemeSlice((s) => s.palette)
    const recompute = useSchemeSlice((s) => s.recompute)

    useEffect(() => {
        recompute()
    }, [seed, scheme, recompute])

    return (
        <div style={{ display: 'grid', gap: 12 }}>
            <div role="group" aria-label="Select color scheme" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {SCHEMES.map((id: SchemeId) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => setScheme(id)}
                        aria-pressed={scheme === id}
                        disabled={!seed}
                        style={{
                            padding: '6px 10px',
                            borderRadius: 6,
                            border: '1px solid #ddd',
                            background: scheme === id ? '#eef' : '#fff',
                            cursor: seed ? 'pointer' : 'not-allowed',
                        }}
                    >
                        {id}
                    </button>
                ))}
            </div>

            {!seed && <small>Enter a seed color to generate palettes</small>}

            {palette && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(64px, 1fr))', gap: 8 }}>
                    {palette.colors.map((c, idx) => (
                        <div key={idx} style={{ display: 'grid', gap: 4, justifyItems: 'center' }}>
                            <div
                                role="img"
                                aria-label={`swatch ${idx + 1} ${c.hex}`}
                                style={{ width: 64, height: 64, borderRadius: 8, border: '1px solid #ccc', background: c.hex }}
                            />
                            <code style={{ fontSize: 12 }}>{c.hex}</code>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
