import React, { useState } from 'react'
import { downloadCardPng, copyCardToClipboard } from '@/lib/svgToPng'
import { DownloadSimple, Copy, Check, CircleNotch } from '@phosphor-icons/react'

interface ExportButtonsProps {
  svgRef: React.RefObject<SVGSVGElement>
  accentColor: string
  activityTitle: string
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  svgRef,
  accentColor,
  activityTitle
}) => {
  const [downloading, setDownloading] = useState(false)
  const [copying, setCopying] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleDownload = async () => {
    if (!svgRef.current || downloading) return
    setDownloading(true)
    setErrorMessage(null)

    try {
      const sanitizedTitle = (activityTitle || 'activity')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      const filename = `ventstride-${sanitizedTitle || 'run'}.png`

      await downloadCardPng(svgRef.current, filename)
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 2500)
    } catch (err) {
      console.error('Download failed:', err)
      setErrorMessage('Failed to generate PNG image. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const handleCopy = async () => {
    if (!svgRef.current || copying) return
    setCopying(true)
    setErrorMessage(null)

    try {
      await copyCardToClipboard(svgRef.current)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2500)
    } catch (err) {
      console.error('Copy failed:', err)
      setErrorMessage('Clipboard copy not supported or permitted in this browser.')
    } finally {
      setCopying(false)
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {/* Download PNG Button */}
        <button
          type='button'
          onClick={handleDownload}
          disabled={downloading}
          className='relative group w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:brightness-110 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed'
          style={{
            backgroundColor: accentColor,
            color: '#10140F'
          }}
        >
          {downloading ? (
            <CircleNotch size={18} className='animate-spin' />
          ) : downloadSuccess ? (
            <Check size={18} weight='bold' />
          ) : (
            <DownloadSimple size={18} weight='bold' />
          )}
          <span>
            {downloadSuccess ? 'Downloaded!' : downloading ? 'Generating PNG…' : 'Download PNG'}
          </span>
        </button>

        {/* Copy to Clipboard Button */}
        <button
          type='button'
          onClick={handleCopy}
          disabled={copying}
          className='w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-[#151C14] border border-[#2A3828] text-[#E8E4D9] hover:bg-[#1A2318] hover:border-[#4A5D45] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed'
        >
          {copying ? (
            <CircleNotch size={18} className='animate-spin text-[#DDB967]' />
          ) : copySuccess ? (
            <Check size={18} weight='bold' className='text-[#DDB967]' />
          ) : (
            <Copy size={18} weight='bold' className='text-[#8A9986]' />
          )}
          <span>
            {copySuccess ? 'Copied to Clipboard!' : copying ? 'Rendering Image…' : 'Copy Image'}
          </span>
        </button>
      </div>

      {/* Export Specifications & Feedback */}
      <div className='flex items-center justify-between px-1 text-[11px] text-[#8A9986]'>
        <span>Export format: 1080 × 1920 PNG (9:16)</span>
        <span>Story & TikTok ready</span>
      </div>

      {errorMessage && (
        <div className='p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300'>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default ExportButtons
