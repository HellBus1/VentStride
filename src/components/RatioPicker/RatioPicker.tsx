import React from 'react'
import { CardRatio, CardOrientation, CardConfig } from '@/types'
import { getCardDimensions } from '@/lib/cardRenderer'
import { ArrowsClockwise } from '@phosphor-icons/react'

interface RatioPickerProps {
  config: CardConfig
  onRatioChange: (r: CardRatio) => void
  onOrientationChange: (o: CardOrientation) => void
}

const RATIO_OPTIONS: {
  value: CardRatio
  label: string
  desc: string
  iconW: number
  iconH: number
}[] = [
  { value: '9:16', label: '9 : 16', desc: 'Instagram Story & TikTok', iconW: 18, iconH: 32 },
  { value: '3:4', label: '3 : 4', desc: 'Social Feed Portrait', iconW: 22, iconH: 29 }
]

export const RatioPicker: React.FC<RatioPickerProps> = ({
  config,
  onRatioChange,
  onOrientationChange
}) => {
  const { ratio, orientation, design } = config
  const { w, h } = getCardDimensions(config)

  return (
    <div className='flex flex-col gap-3'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <label className='text-xs font-bold uppercase tracking-wider text-neutral-500'>
          Card Aspect & Dimensions
        </label>
        <span className='text-xs font-semibold text-neutral-700 font-mono bg-neutral-100 px-2 py-0.5 rounded'>
          {w} × {h} px
        </span>
      </div>

      {/* Preset Ratios (9:16 & 3:4) */}
      <div className='grid grid-cols-2 gap-2'>
        {RATIO_OPTIONS.map((r) => {
          const isActive = r.value === ratio
          const isLandscape =
            design === 'grid' || (design === 'bottom-badge' && orientation === 'horizontal')

          return (
            <button
              key={r.value}
              type='button'
              onClick={() => onRatioChange(r.value)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400'
              }`}
            >
              <div
                className={`rounded-xs ${isActive ? 'bg-white/40' : 'bg-neutral-300'}`}
                style={{
                  width: isLandscape ? r.iconH * 0.5 : r.iconW * 0.5,
                  height: isLandscape ? r.iconW * 0.5 : r.iconH * 0.5
                }}
              />
              <span className='text-xs'>{r.label}</span>
              <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-neutral-400'}`}>
                {r.desc}
              </span>
            </button>
          )
        })}
      </div>

      {/* Orientation Toggle: ONLY shown for Bottom Overlay since Stacked is Vertical and Grid is Horizontal */}
      {design === 'bottom-badge' && (
        <div className='flex items-center justify-between p-2 bg-neutral-50 border border-neutral-200 rounded-xl'>
          <span className='text-xs font-medium text-neutral-600 flex items-center gap-1.5'>
            <ArrowsClockwise size={14} />
            <span>Orientation:</span>
          </span>
          <div className='flex items-center gap-1 bg-white p-0.5 rounded-lg border border-neutral-200'>
            <button
              type='button'
              onClick={() => onOrientationChange('vertical')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                orientation === 'vertical'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Vertical
            </button>
            <button
              type='button'
              onClick={() => onOrientationChange('horizontal')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                orientation === 'horizontal'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Horizontal
            </button>
          </div>
        </div>
      )}

      {/* Format note */}
      <div className='text-[11px] text-neutral-400 text-center'>
        {design === 'stacked' &&
          'Stacked Hero is optimized as a full-height vertical story overlay.'}
        {design === 'grid' && 'Grid Matrix is optimized as a clean horizontal banner layout.'}
        {design === 'bottom-badge' && 'Bottom Overlay can be oriented vertically or horizontally.'}
      </div>
    </div>
  )
}

export default RatioPicker
