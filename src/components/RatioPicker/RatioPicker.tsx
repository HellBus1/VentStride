import React from 'react'
import { CardRatio, RATIO_DIMENSIONS } from '@/types'
import { Sliders, Lock, LockOpen } from '@phosphor-icons/react'

interface RatioPickerProps {
  ratio: CardRatio
  customWidth: number
  customHeight: number
  lockAspectRatio: boolean
  onRatioChange: (r: CardRatio) => void
  onWidthChange: (w: number) => void
  onHeightChange: (h: number) => void
  onLockToggle: (locked: boolean) => void
}

const RATIOS: { value: CardRatio; label: string; desc: string; iconW: number; iconH: number }[] = [
  { value: '9:16', label: '9:16', desc: 'Story', iconW: 18, iconH: 32 },
  { value: '3:4', label: '3:4', desc: 'Portrait', iconW: 21, iconH: 28 },
  { value: '1:1', label: '1:1', desc: 'Square', iconW: 26, iconH: 26 },
  { value: '16:9', label: '16:9', desc: 'Wide', iconW: 32, iconH: 18 },
  { value: 'custom', label: 'Custom', desc: 'Free', iconW: 24, iconH: 24 }
]

export const RatioPicker: React.FC<RatioPickerProps> = ({
  ratio,
  customWidth,
  customHeight,
  lockAspectRatio,
  onRatioChange,
  onWidthChange,
  onHeightChange,
  onLockToggle
}) => {
  const handleWidthSlider = (newW: number) => {
    onWidthChange(newW)
    if (lockAspectRatio && customWidth > 0) {
      const ratioVal = customHeight / customWidth
      onHeightChange(Math.round(newW * ratioVal))
    }
  }

  const handleHeightSlider = (newH: number) => {
    onHeightChange(newH)
    if (lockAspectRatio && customHeight > 0) {
      const ratioVal = customWidth / customHeight
      onWidthChange(Math.round(newH * ratioVal))
    }
  }

  const currentW = ratio === 'custom' ? customWidth : RATIO_DIMENSIONS[ratio]?.w || 1080
  const currentH = ratio === 'custom' ? customHeight : RATIO_DIMENSIONS[ratio]?.h || 1920

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <label className='text-xs font-bold uppercase tracking-wider text-neutral-500'>
          Card Size & Dimensions
        </label>
        <span className='text-xs font-semibold text-neutral-700 font-mono'>
          {currentW} × {currentH} px
        </span>
      </div>

      {/* Preset Buttons */}
      <div className='grid grid-cols-5 gap-1.5'>
        {RATIOS.map((r) => {
          const isActive = r.value === ratio
          return (
            <button
              key={r.value}
              type='button'
              onClick={() => {
                onRatioChange(r.value)
                if (r.value !== 'custom') {
                  const dims = RATIO_DIMENSIONS[r.value]
                  onWidthChange(dims.w)
                  onHeightChange(dims.h)
                }
              }}
              className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl border text-xs font-semibold transition-all ${
                isActive
                  ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400'
              }`}
            >
              <div
                className={`rounded-xs ${isActive ? 'bg-white/40' : 'bg-neutral-300'}`}
                style={{ width: r.iconW * 0.5, height: r.iconH * 0.5 }}
              />
              <span className='text-[11px]'>{r.label}</span>
              <span className={`text-[9px] ${isActive ? 'text-white/70' : 'text-neutral-400'}`}>
                {r.desc}
              </span>
            </button>
          )
        })}
      </div>

      {/* Dimension Sliders / Inputs (shown when Custom or expanded) */}
      <div className='pt-2 border-t border-neutral-100 flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <span className='text-[11px] font-medium text-neutral-500 flex items-center gap-1'>
            <Sliders size={13} />
            <span>Custom Width & Height</span>
          </span>
          <button
            type='button'
            onClick={() => onLockToggle(!lockAspectRatio)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border transition-colors ${
              lockAspectRatio
                ? 'bg-neutral-100 border-neutral-300 text-neutral-800'
                : 'bg-white border-neutral-200 text-neutral-400'
            }`}
          >
            {lockAspectRatio ? <Lock size={12} weight='bold' /> : <LockOpen size={12} />}
            <span>Lock Ratio</span>
          </button>
        </div>

        {/* Width slider & input */}
        <div className='flex items-center gap-2'>
          <span className='text-xs font-semibold text-neutral-500 w-12'>Width:</span>
          <input
            type='range'
            min={400}
            max={2400}
            step={20}
            value={currentW}
            onChange={(e) => {
              if (ratio !== 'custom') onRatioChange('custom')
              handleWidthSlider(parseInt(e.target.value))
            }}
            className='flex-1 accent-neutral-900 cursor-pointer h-1.5 bg-neutral-200 rounded-lg'
          />
          <div className='relative w-20'>
            <input
              type='number'
              min={400}
              max={3000}
              value={currentW}
              onChange={(e) => {
                if (ratio !== 'custom') onRatioChange('custom')
                handleWidthSlider(parseInt(e.target.value) || 1080)
              }}
              className='w-full py-1 px-2 text-xs font-mono font-semibold bg-neutral-50 border border-neutral-200 rounded-md text-right'
            />
            <span className='absolute right-6 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 pointer-events-none' />
          </div>
        </div>

        {/* Height slider & input */}
        <div className='flex items-center gap-2'>
          <span className='text-xs font-semibold text-neutral-500 w-12'>Height:</span>
          <input
            type='range'
            min={400}
            max={2400}
            step={20}
            value={currentH}
            onChange={(e) => {
              if (ratio !== 'custom') onRatioChange('custom')
              handleHeightSlider(parseInt(e.target.value))
            }}
            className='flex-1 accent-neutral-900 cursor-pointer h-1.5 bg-neutral-200 rounded-lg'
          />
          <div className='relative w-20'>
            <input
              type='number'
              min={400}
              max={3000}
              value={currentH}
              onChange={(e) => {
                if (ratio !== 'custom') onRatioChange('custom')
                handleHeightSlider(parseInt(e.target.value) || 1920)
              }}
              className='w-full py-1 px-2 text-xs font-mono font-semibold bg-neutral-50 border border-neutral-200 rounded-md text-right'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatioPicker
