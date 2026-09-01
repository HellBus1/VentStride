import React from 'react'
import { ACCENT_COLORS } from '@/constants/accentColors'
import { Check } from '@phosphor-icons/react'

interface AccentPickerProps {
  selectedHex: string
  onChange: (hex: string) => void
}

export const AccentPicker: React.FC<AccentPickerProps> = ({ selectedHex, onChange }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <label className='text-xs font-semibold uppercase tracking-wider text-neutral-500'>
          Accent Color
        </label>
        <span className='text-[11px] text-neutral-400 font-medium'>
          {ACCENT_COLORS.find((c) => c.hex.toLowerCase() === selectedHex.toLowerCase())?.name ||
            'Custom'}
        </span>
      </div>
      <div className='flex gap-2'>
        {ACCENT_COLORS.map((color) => {
          const isSelected = color.hex.toLowerCase() === selectedHex.toLowerCase()
          return (
            <button
              key={color.id}
              type='button'
              onClick={() => onChange(color.hex)}
              title={color.name}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isSelected
                  ? 'ring-2 ring-offset-2 ring-neutral-900 scale-110'
                  : 'hover:scale-110 opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {isSelected && (
                <Check
                  weight='bold'
                  size={14}
                  className={
                    color.id === 'chalk' ? 'text-neutral-700' : 'text-white drop-shadow-sm'
                  }
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default AccentPicker
