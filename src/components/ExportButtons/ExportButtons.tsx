import React, { useState } from 'react'
import { CardPreviewHandle } from '@/components/CardPreview/CardPreview'
import { downloadCardPng, copyCardToClipboard } from '@/lib/exportCard'
import { CardConfig } from '@/types'
import { getCardDimensions } from '@/lib/cardRenderer'
import { DownloadSimple, Copy, Check, CircleNotch } from '@phosphor-icons/react'

interface ExportButtonsProps {
  cardPreviewRef: React.RefObject<CardPreviewHandle>
  activityTitle: string
  config: CardConfig
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  cardPreviewRef,
  activityTitle,
  config
}) => {
  const [downloading, setDownloading] = useState(false)
  const [copying, setCopying] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { w, h } = getCardDimensions(config)

  const handleDownload = async () => {
    const canvas = cardPreviewRef.current?.getCanvas()
    if (!canvas || downloading) return

    setDownloading(true)
    setErrorMessage(null)

    try {
      const sanitizedTitle = (activityTitle || 'run')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      const filename = `ventstride-${sanitizedTitle}-${w}x${h}.png`

      await downloadCardPng(canvas, filename)
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 2000)
    } catch (err) {
      console.error('Download failed:', err)
      setErrorMessage('Failed to generate PNG image.')
    } finally {
      setDownloading(false)
    }
  }

  const handleCopy = async () => {
    const canvas = cardPreviewRef.current?.getCanvas()
    if (!canvas || copying) return

    setCopying(true)
    setErrorMessage(null)

    try {
      await copyCardToClipboard(canvas)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
      setErrorMessage('Clipboard copy not supported in this browser.')
    } finally {
      setCopying(false)
    }
  }

  return (
    <div className='flex flex-col gap-2.5'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
        {/* Download PNG Button */}
        <button
          type='button'
          onClick={handleDownload}
          disabled={downloading}
          className='w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-[#E8590C] hover:bg-[#d04e0a] text-white shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer'
        >
          {downloading ? (
            <CircleNotch size={17} className='animate-spin' />
          ) : downloadSuccess ? (
            <Check size={17} weight='bold' />
          ) : (
            <DownloadSimple size={17} weight='bold' />
          )}
          <span>
            {downloadSuccess ? 'Downloaded!' : downloading ? 'Exporting...' : 'Download PNG'}
          </span>
        </button>

        {/* Copy Image Button */}
        <button
          type='button'
          onClick={handleCopy}
          disabled={copying}
          className='w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50 transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer'
        >
          {copying ? (
            <CircleNotch size={17} className='animate-spin text-neutral-600' />
          ) : copySuccess ? (
            <Check size={17} weight='bold' className='text-green-600' />
          ) : (
            <Copy size={17} weight='bold' className='text-neutral-500' />
          )}
          <span>{copySuccess ? 'Copied!' : copying ? 'Copying...' : 'Copy Image'}</span>
        </button>
      </div>

      <div className='flex items-center justify-between px-1 text-[11px] text-neutral-400 font-medium'>
        <span>
          {w} × {h} px ({config.ratio.toUpperCase()})
        </span>
        <span>{config.theme === 'overlay' ? 'Transparent Overlay' : 'Full Card PNG'}</span>
      </div>

      {errorMessage && (
        <div className='p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600'>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default ExportButtons
