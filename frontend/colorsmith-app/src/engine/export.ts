import type { Palette } from './schemes'
import type { Gradient } from './gradient'

export function exportPalette(palette: Palette, format: 'svg' | 'png' | 'css' | 'json'): string | Blob {
    switch (format) {
        case 'svg':
            // Simple SVG swatch grid
            return `<svg width='${palette.colors.length * 40}' height='40'>${palette.colors.map((c, i) => `<rect x='${i * 40}' y='0' width='40' height='40' fill='${c.hex}'/>`).join('')}</svg>`
        case 'css':
            return palette.colors.map((c, i) => `--color${i + 1}: ${c.hex};`).join('\n')
        case 'json':
            return JSON.stringify(palette, null, 2)
        case 'png':
            // Use canvas for PNG
            const canvas = document.createElement('canvas')
            canvas.width = palette.colors.length * 40
            canvas.height = 40
            const ctx = canvas.getContext('2d')!
            palette.colors.forEach((c, i) => {
                ctx.fillStyle = c.hex
                ctx.fillRect(i * 40, 0, 40, 40)
            })
            return canvas.toDataURL('image/png')
    }
}

export function exportGradient(gradient: Gradient, format: 'svg' | 'png' | 'css' | 'json'): string | Blob {
    switch (format) {
        case 'svg':
            return gradient.svg
        case 'css':
            return gradient.css
        case 'json':
            return JSON.stringify(gradient, null, 2)
        case 'png':
            // Use canvas for PNG
            const canvas = document.createElement('canvas')
            canvas.width = 320
            canvas.height = 64
            const ctx = canvas.getContext('2d')!
            // Fill with CSS gradient
            const tmp = document.createElement('div')
            tmp.style.background = gradient.css
            document.body.appendChild(tmp)
            ctx.fillStyle = getComputedStyle(tmp).backgroundImage || '#fff'
            ctx.fillRect(0, 0, 320, 64)
            document.body.removeChild(tmp)
            return canvas.toDataURL('image/png')
    }
}

export async function copyToClipboard(data: string | Blob): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
        throw new Error('Clipboard API not available')
    }
    if (typeof data === 'string') {
        await navigator.clipboard.writeText(data)
    } else if (data instanceof Blob) {
        if (typeof window.ClipboardItem !== 'undefined') {
            await navigator.clipboard.write([new window.ClipboardItem({ [data.type]: data })])
        } else {
            throw new Error('ClipboardItem API not available')
        }
    }
}