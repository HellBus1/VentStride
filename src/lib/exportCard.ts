/**
 * Canvas-based export: download PNG + copy to clipboard.
 * No SVG serialization needed - canvas.toBlob() handles everything.
 */

export async function downloadCardPng(
  canvas: HTMLCanvasElement,
  filename = 'ventstride-activity.png'
): Promise<void> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas toBlob returned null'))
          return
        }
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        resolve()
      },
      'image/png',
      1.0
    )
  })
}

export async function copyCardToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  if (!navigator.clipboard || !window.ClipboardItem) {
    throw new Error('Clipboard API is not supported in this browser.')
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          reject(new Error('Canvas toBlob returned null'))
          return
        }
        try {
          const item = new ClipboardItem({ 'image/png': blob })
          await navigator.clipboard.write([item])
          resolve(true)
        } catch (err) {
          reject(err)
        }
      },
      'image/png',
      1.0
    )
  })
}
