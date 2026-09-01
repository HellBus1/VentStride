import React from 'react'
import { CardDesign } from '@/types'
import { Rows, GridFour, Cards } from '@phosphor-icons/react'

interface DesignPickerProps {
  design: CardDesign
  onChange: (d: CardDesign) => void
}

const DESIGNS: { value: CardDesign; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    value: 'stacked',
    label: 'Stacked Hero',
    desc: 'Large centered stats',
    icon: <Rows size={18} weight='bold' />
  },
  {
    value: 'grid',
    label: 'Grid Matrix',
    desc: '2x3 stat matrix',
    icon: <GridFour size={18} weight='bold' />
  },
  {
    value: 'bottom-badge',
    label: 'Bottom Overlay',
    desc: 'Lower third bar',
    icon: <Cards size={18} weight='bold' />
  }
]

export const DesignPicker: React.FC<DesignPickerProps> = ({ design, onChange }) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-xs font-bold uppercase tracking-wider text-neutral-500'>
        Card Design
      </label>
      <div className='grid grid-cols-3 gap-2'>
        {DESIGNS.map((d) => {
          const isActive = d.value === design
          return (
            <button
              key={d.value}
              type='button'
              onClick={() => onChange(d.value)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                isActive
                  ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-neutral-500'}>{d.icon}</span>
              <span className='text-xs font-bold'>{d.label}</span>
              <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-neutral-400'}`}>
                {d.desc}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DesignPicker
