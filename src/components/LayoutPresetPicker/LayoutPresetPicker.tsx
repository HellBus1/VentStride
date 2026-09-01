import React from 'react'
import { LayoutPreset } from '@/types'
import { Sparkle, Rows } from '@phosphor-icons/react'

interface LayoutPresetPickerProps {
  preset: LayoutPreset
  onChange: (preset: LayoutPreset) => void
}

export const LayoutPresetPicker: React.FC<LayoutPresetPickerProps> = ({ preset, onChange }) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-xs font-semibold uppercase tracking-wider text-neutral-500'>
        Stats Layout
      </label>
      <div className='grid grid-cols-2 gap-2'>
        <button
          type='button'
          onClick={() => onChange('essential')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium border transition-all ${
            preset === 'essential'
              ? 'border-neutral-900 bg-neutral-900 text-white'
              : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
          }`}
        >
          <Sparkle weight={preset === 'essential' ? 'fill' : 'regular'} size={15} />
          <span>Essential</span>
          <span className='opacity-50 text-[10px]'>3</span>
        </button>
        <button
          type='button'
          onClick={() => onChange('detailed')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium border transition-all ${
            preset === 'detailed'
              ? 'border-neutral-900 bg-neutral-900 text-white'
              : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
          }`}
        >
          <Rows weight={preset === 'detailed' ? 'bold' : 'regular'} size={15} />
          <span>Detailed</span>
          <span className='opacity-50 text-[10px]'>6</span>
        </button>
      </div>
    </div>
  )
}

export default LayoutPresetPicker
