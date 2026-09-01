import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react'
import { ActivityInput, CardConfig } from '@/types'
import { renderCard, ensureFontsLoaded, getCardDimensions } from '@/lib/cardRenderer'
import { MagnifyingGlassPlus, MagnifyingGlassMinus } from '@phosphor-icons/react'

interface CardPreviewProps {
  activity: ActivityInput
  config: CardConfig
}

export interface CardPreviewHandle {
  getCanvas: () => HTMLCanvasElement | null
}

export const CardPreview = forwardRef<CardPreviewHandle, CardPreviewProps>(
  ({ activity, config }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [previewScale, setPreviewScale] = useState<number>(100) // percent

    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current
    }))

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      ensureFontsLoaded().then(() => {
        renderCard(canvas, activity, config)
      })
    }, [activity, config])

    const { w, h } = getCardDimensions(config)
    const aspectCss = `${w} / ${h}`
    const isOverlay = config.theme === 'overlay'

    // Determine preview max width based on scale and aspect
    const baseWidth = w >= h ? 480 : 360
    const scaledWidth = Math.round(baseWidth * (previewScale / 100))

    return (
      <div className='w-full flex flex-col items-center gap-3'>
        {/* Card Canvas Container */}
        <div
          className='relative w-full rounded-2xl overflow-hidden shadow-xl border border-neutral-200 transition-all duration-200'
          style={{
            maxWidth: `${scaledWidth}px`,
            aspectRatio: aspectCss,
            ...(isOverlay
              ? {
                  backgroundImage:
                    'linear-gradient(45deg, #e5e5e5 25%, transparent 25%, transparent 75%, #e5e5e5 75%), linear-gradient(45deg, #e5e5e5 25%, transparent 25%, transparent 75%, #e5e5e5 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px',
                  backgroundColor: '#f5f5f5'
                }
              : {})
          }}
        >
          <canvas
            ref={canvasRef}
            className='w-full h-full block'
            style={{ aspectRatio: aspectCss }}
          />
        </div>

        {/* Zoom Controls */}
        <div className='flex items-center gap-3 px-3 py-1.5 bg-white border border-neutral-200 rounded-full shadow-xs text-xs'>
          <button
            type='button'
            onClick={() => setPreviewScale((prev) => Math.max(60, prev - 15))}
            className='text-neutral-500 hover:text-neutral-900 transition-colors p-0.5'
            title='Zoom Out'
          >
            <MagnifyingGlassMinus size={15} />
          </button>
          <span className='font-mono font-medium text-neutral-600 w-10 text-center'>
            {previewScale}%
          </span>
          <button
            type='button'
            onClick={() => setPreviewScale((prev) => Math.min(140, prev + 15))}
            className='text-neutral-500 hover:text-neutral-900 transition-colors p-0.5'
            title='Zoom In'
          >
            <MagnifyingGlassPlus size={15} />
          </button>
          <button
            type='button'
            onClick={() => setPreviewScale(100)}
            className='text-[10px] uppercase font-bold text-neutral-400 hover:text-neutral-700 ml-1'
          >
            Reset
          </button>
        </div>
      </div>
    )
  }
)

CardPreview.displayName = 'CardPreview'

export default CardPreview
