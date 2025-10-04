import { useGradientSlice } from '../../state/useGradientSlice'
import { useState } from 'react'
import { exportGradient, copyToClipboard } from '../../engine/export'

export default function GradientPreview() {
    const kind = useGradientSlice((s) => s.kind)
    const angle = useGradientSlice((s) => s.angle)
    const stops = useGradientSlice((s) => s.stops)
    const setKind = useGradientSlice((s) => s.setKind)
    const setAngle = useGradientSlice((s) => s.setAngle)
    const setStops = useGradientSlice((s) => s.setStops)
    const gradient = useGradientSlice((s) => s.gradient)

    // For demo: allow editing stops as hex strings
    const [stopInputs, setStopInputs] = useState(stops.map(s => s.hex))

    const onStopChange = (i: number, val: string) => {
        const arr = [...stopInputs]
        arr[i] = val
        setStopInputs(arr)
        // Try to parse and update stops
        try {
            const parsed = arr.map(hex => ({ hex, rgb: [0, 0, 0], hsl: [0, 0, 0], oklch: [0, 0, 0] }))
            setStops(parsed as any)
        } catch { }
    }

    const addStop = () => {
        setStopInputs([...stopInputs, '#ffffff'])
        setStops([...stops, { hex: '#ffffff', rgb: [0, 0, 0], hsl: [0, 0, 0], oklch: [0, 0, 0] }] as any)
    }
    const removeStop = (i: number) => {
        if (stopInputs.length <= 2) return
        const arr = [...stopInputs]
        arr.splice(i, 1)
        setStopInputs(arr)
        const s2 = [...stops]
        s2.splice(i, 1)
        setStops(s2)
    }

    const [msg, setMsg] = useState<string | null>(null)

    const doExport = async (type: 'svg' | 'png' | 'css' | 'json') => {
        if (!gradient) return
        const out = exportGradient(gradient, type)
        if (type === 'png') {
            window.open(out as string, '_blank')
            setMsg('PNG opened in new tab')
        } else {
            await copyToClipboard(out as string)
            setMsg(type.toUpperCase() + ' copied to clipboard')
        }
    }

    return (
        <div style={{ display: 'grid', gap: 16, maxWidth: 480 }}>
            <div style={{ display: 'flex', gap: 8 }}>
                <label>
                    <input type="radio" checked={kind === 'linear'} onChange={() => setKind('linear')} /> Linear
                </label>
                <label>
                    <input type="radio" checked={kind === 'radial'} onChange={() => setKind('radial')} /> Radial
                </label>
                {kind === 'linear' && (
                    <label style={{ marginLeft: 16 }}>
                        Angle: <input type="number" min={0} max={360} value={angle} onChange={e => setAngle(Number(e.target.value))} style={{ width: 60 }} />°
                    </label>
                )}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                Stops:
                {stopInputs.map((hex, i) => (
                    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <input type="color" value={hex} onChange={e => onStopChange(i, e.target.value)} />
                        <input type="text" value={hex} onChange={e => onStopChange(i, e.target.value)} style={{ width: 80 }} />
                        <button type="button" onClick={() => removeStop(i)} disabled={stopInputs.length <= 2}>×</button>
                    </span>
                ))}
                <button type="button" onClick={addStop} disabled={stopInputs.length >= 5}>Add</button>
            </div>
            <div>
                {gradient ? (
                    <>
                        <div style={{ width: 320, height: 64, borderRadius: 8, border: '1px solid #ccc', background: gradient.css }} aria-label="gradient preview" />
                        <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                            <span>Export:</span>
                            {(['svg', 'png', 'css', 'json'] as const).map(type => (
                                <button key={type} type="button" onClick={() => doExport(type)}>{type.toUpperCase()}</button>
                            ))}
                            {msg && <span style={{ color: 'green', marginLeft: 8 }}>{msg}</span>}
                        </div>
                    </>
                ) : (
                    <small>At least 2 stops required</small>
                )}
            </div>
        </div>
    )
}