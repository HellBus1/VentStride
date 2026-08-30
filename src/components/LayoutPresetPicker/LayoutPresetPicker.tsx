import React from 'react'
import { LayoutPreset } from '@/types'
import { Sparkle, Rows } from '@phosphor-icons/react'

interface LayoutPresetPickerProps {
  preset: LayoutPreset
  onChange: (preset: LayoutPreset) => void
  accentColor: string
}

export const LayoutPresetPicker: React.FC<LayoutPresetPickerProps> = ({
  preset,
  onChange,
  accentColor
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-xs font-semibold uppercase tracking-wider text-[#8A9986]'>
        Card Layout
      </label>
      <div className='grid grid-cols-2 gap-2 p-1 bg-[#151C14] border border-[#2A3828] rounded-xl'>
        <button
          type='button'
          onClick={() => onChange('essential')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
            preset === 'essential'
              ? 'bg-[#1A2318] text-[#E8E4D9] shadow-sm border border-[#2A3828]'
              : 'text-[#8A9986] hover:text-[#E8E4D9] hover:bg-[#1A2318]/50'
          }`}
          style={preset === 'essential' ? { borderColor: `${accentColor}40` } : {}}
        >
          <Sparkle
            weight={preset === 'essential' ? 'fill' : 'regular'}
            size={16}
            style={{ color: preset === 'essential' ? accentColor : undefined }}
          />
          <span>Essential</span>
          <span className='text-[10px] opacity-60 ml-0.5'>(3 Stats)</span>
        </button>

        <button
          type='button'
          onClick={() => onChange('detailed')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
            preset === 'detailed'
              ? 'bg-[#1A2318] text-[#E8E4D9] shadow-sm border border-[#2A3828]'
              : 'text-[#8A9986] hover:text-[#E8E4D9] hover:bg-[#1A2318]/50'
          }`}
          style={preset === 'detailed' ? { borderColor: `${accentColor}40` } : {}}
        >
          <Rows
            weight={preset === 'detailed' ? 'bold' : 'regular'}
            size={16}
            style={{ color: preset === 'detailed' ? accentColor : undefined }}
          />
          <span>Detailed</span>
          <span className='text-[10px] opacity-60 ml-0.5'>(6 Stats)</span>
        </button>
      </div>
    </div>
  )
}

export default LayoutPresetPicker
