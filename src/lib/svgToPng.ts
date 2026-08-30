/**
 * SVG to PNG Export & Clipboard Pipeline
 * Renders the 1080x1920 SVG onto an offscreen canvas and exports a high-res PNG blob.
 */

// In-memory cache for font base64 styles
let cachedFontStyles: string | null = null

const FONT_SOURCES = [
  {
    family: 'Cormorant Garamond',
    weight: '600',
    style: 'normal',
    url: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtKky2F7g.woff2',
    format: 'woff2'
  },
  {
    family: 'Cormorant Garamond',
    weight: '700',
    style: 'normal',
    url: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtKky2F7g.woff2',
    format: 'woff2'
  },
  {
    family: 'Cormorant Garamond',
    weight: '600',
    style: 'italic',
    url: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtImSqn7B6D.woff2',
    format: 'woff2'
  },
  {
    family: 'General Sans',
    weight: '500',
    style: 'normal',
    url: 'https://cdn.fontshare.com/wf/3RZHWSNONLLWJK3RLPEKUZOMM56GO4LJ/BPDRY7AHVI3MCDXXVXTQQ76H3UXA63S3/SB2OEB6IKZPRR6JT4GFJ2TFT6HBB6AZN.woff2',
    format: 'woff2'
  },
  {
    family: 'General Sans',
    weight: '600',
    style: 'normal',
    url: 'https://cdn.fontshare.com/wf/K46YRH762FH3QJ25IQM3VAXAKCHEXXW4/ISLWQPUZHZF33LRIOTBMFOJL57GBGQ4B/3ZLMEXZEQPLTEPMHTQDAUXP5ZZXCZAEN.woff2',
    format: 'woff2'
  },
  {
    family: 'General Sans',
    weight: '700',
    style: 'normal',
    url: 'https://cdn.fontshare.com/wf/KWXO5X3YW4X7OLUMPO4X24HQJGJU7E2Q/VOWUQZS3YLP66ZHPTXAFSH6YACY4WJHT/NIQ54PVBBIWVK3PFSOIOUJSXIJ5WTNDP.woff2',
    format: 'woff2'
  }
]

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/**
 * Loads font files as base64 @font-face rules so that canvas rendering
 * preserves custom typography without falling back to system serif/sans.
 */
export async function getEmbeddedFontStyles(): Promise<string> {
  if (cachedFontStyles) return cachedFontStyles

  try {
    const fontPromises = FONT_SOURCES.map(async (f) => {
      try {
        const res = await fetch(f.url)
        const blob = await res.blob()
        const base64 = await blobToBase64(blob)
        return `@font-face {
  font-family: '${f.family}';
  font-style: ${f.style};
  font-weight: ${f.weight};
  src: url('${base64}') format('${f.format}');
}`
      } catch (err) {
        console.warn(`Failed to fetch font ${f.family} (${f.weight}):`, err)
        return `@font-face {
  font-family: '${f.family}';
  font-style: ${f.style};
  font-weight: ${f.weight};
  src: url('${f.url}') format('${f.format}');
}`
      }
    })

    const fontRules = await Promise.all(fontPromises)
    cachedFontStyles = fontRules.join('\n')
    return cachedFontStyles
  } catch {
    return ''
  }
}

/**
 * Converts the SVG element to a high resolution PNG Blob (1080x1920)
 */
export async function renderSvgToPngBlob(svgElement: SVGSVGElement): Promise<Blob> {
  // Wait for document fonts to be active
  if (document.fonts) {
    await document.fonts.ready
  }

  // Clone SVG node to avoid modifying DOM
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement
  clonedSvg.setAttribute('width', '1080')
  clonedSvg.setAttribute('height', '1920')

  // Embed font rules inside SVG defs
  const fontStyles = await getEmbeddedFontStyles()
  if (fontStyles) {
    let defs = clonedSvg.querySelector('defs')
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      clonedSvg.insertBefore(defs, clonedSvg.firstChild)
    }
    const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style')
    styleEl.textContent = fontStyles
    defs.appendChild(styleEl)
  }

  const serializer = new XMLSerializer()
  let svgString = serializer.serializeToString(clonedSvg)

  // Fix namespace if missing
  if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"')
  }

  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const blobUrl = URL.createObjectURL(svgBlob)

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1080
      canvas.height = 1920
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        URL.revokeObjectURL(blobUrl)
        reject(new Error('Failed to create canvas 2D context'))
        return
      }

      // Draw background
      ctx.fillStyle = '#10140F'
      ctx.fillRect(0, 0, 1080, 1920)

      // Draw SVG
      ctx.drawImage(img, 0, 0, 1080, 1920)
      URL.revokeObjectURL(blobUrl)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Canvas toBlob returned null'))
          }
        },
        'image/png',
        1.0
      )
    }

    img.onerror = (err) => {
      URL.revokeObjectURL(blobUrl)
      reject(err)
    }

    img.src = blobUrl
  })
}

/**
 * Triggers file download of the activity card as PNG
 */
export async function downloadCardPng(
  svgElement: SVGSVGElement,
  filename = 'ventstride-activity.png'
): Promise<void> {
  const blob = await renderSvgToPngBlob(svgElement)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Copies the activity card PNG image directly to clipboard
 */
export async function copyCardToClipboard(svgElement: SVGSVGElement): Promise<boolean> {
  const blob = await renderSvgToPngBlob(svgElement)

  if (!navigator.clipboard || !window.ClipboardItem) {
    throw new Error('Clipboard API is not supported in this browser.')
  }

  const item = new ClipboardItem({ 'image/png': blob })
  await navigator.clipboard.write([item])
  return true
}
