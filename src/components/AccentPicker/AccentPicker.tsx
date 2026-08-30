import React from 'react'
import { ACCENT_COLORS } from '@/constants/accentColors'
import { Check } from '@phosphor-icons/react'

interface AccentPickerProps {
  selectedHex: string
  onChange: (hex: string) => void
}

export const AccentPicker: React.FC<AccentPickerProps> = ({ selectedHex, onChange }) => {
  return (
    <div className='flex flex-col gap-2.5'>
      <div className='flex items-center justify-between'>
        <label className='text-xs font-semibold uppercase tracking-wider text-[#8A9986]'>
          Card Accent Color
        </label>
        <span className='text-[11px] text-[#8A9986] font-medium'>
          {ACCENT_COLORS.find((c) => c.hex.toLowerCase() === selectedHex.toLowerCase())?.name ||
            'Custom'}
        </span>
      </div>

      <div className='grid grid-cols-6 gap-2 p-2 bg-[#151C14] border border-[#2A3828] rounded-xl'>
        {ACCENT_COLORS.map((color) => {
          const isSelected = color.hex.toLowerCase() === selectedHex.toLowerCase()
          return (
            <button
              key={color.id}
              type='button'
              onClick={() => onChange(color.hex)}
              title={`${color.name}: ${color.desc}`}
              className={`group relative aspect-square rounded-lg flex items-center justify-center transition-all duration-200 ${
                isSelected
                  ? 'ring-2 ring-offset-2 ring-offset-[#10140F] scale-105 shadow-md'
                  : 'hover:scale-105 opacity-80 hover:opacity-100'
              }`}
              style={{
                backgroundColor: color.hex,
                // @ts-expect-error Tailwind ring color custom prop
                '--tw-ring-color': color.hex
              }}
            >
              {isSelected && (
                <Check
                  weight='bold'
                  size={16}
                  className={
                    color.id === 'chalk' ? 'text-[#10140F]' : 'text-[#10140F] drop-shadow-sm'
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
