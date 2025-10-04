import { useEffect, useRef, useState } from 'react'

type Props = { onPick: (hex: string) => void }

function rgbToHex(r: number, g: number, b: number) {
    const toHex = (n: number) => n.toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export default function CanvasPicker({ onPick }: Props) {
    const [imgUrl, setImgUrl] = useState<string | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        if (!imgUrl) return
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
            const canvas = canvasRef.current!
            const ctx = canvas.getContext('2d')!
            // fit within 400x300 while preserving aspect
            const maxW = 400, maxH = 300
            let w = img.width, h = img.height
            const scale = Math.min(maxW / w, maxH / h, 1)
            w = Math.floor(w * scale); h = Math.floor(h * scale)
            canvas.width = w; canvas.height = h
            ctx.drawImage(img, 0, 0, w, h)
        }
        img.src = imgUrl
        imgRef.current = img
    }, [imgUrl])

    const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0]
        if (!f) return
        const url = URL.createObjectURL(f)
        setImgUrl(url)
    }

    const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current!
        const rect = canvas.getBoundingClientRect()
        const x = Math.floor(e.clientX - rect.left)
        const y = Math.floor(e.clientY - rect.top)
        const ctx = canvas.getContext('2d')!
        const data = ctx.getImageData(x, y, 1, 1).data
        const hex = rgbToHex(data[0], data[1], data[2])
        onPick(hex)
    }

    return (
        <div style={{ display: 'grid', gap: 8 }}>
            <label>
                Upload image
                <input type="file" accept="image/*" onChange={onFile} />
            </label>
            <canvas ref={canvasRef} onClick={onClick} style={{ border: '1px solid #ddd', borderRadius: 4, cursor: 'crosshair' }} />
            <small>Click the image to pick a color</small>
        </div>
    )
}
