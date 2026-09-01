import React from 'react'
import { CardTheme } from '@/types'

interface ThemePickerProps {
  theme: CardTheme
  onChange: (t: CardTheme) => void
}

const THEMES: {
  value: CardTheme
  name: string
  desc: string
  bgColor: string
  textColor: string
  dotColor: string
}[] = [
  {
    value: 'overlay',
    name: 'Overlay',
    desc: 'Transparent sticker',
    bgColor: 'bg-neutral-100',
    textColor: 'text-neutral-900',
    dotColor: 'bg-neutral-400'
  },
  {
    value: 'classic',
    name: 'Classic',
    desc: 'Dark card',
    bgColor: 'bg-neutral-900',
    textColor: 'text-neutral-100',
    dotColor: 'bg-amber-500'
  },
  {
    value: 'clean',
    name: 'Clean',
    desc: 'Light card',
    bgColor: 'bg-amber-50',
    textColor: 'text-neutral-800',
    dotColor: 'bg-amber-600'
  }
]

export const ThemePicker: React.FC<ThemePickerProps> = ({ theme, onChange }) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-xs font-semibold uppercase tracking-wider text-neutral-500'>
        Card Theme
      </label>
      <div className='grid grid-cols-3 gap-2'>
        {THEMES.map((t) => {
          const isActive = t.value === theme
          return (
            <button
              key={t.value}
              type='button'
              onClick={() => onChange(t.value)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                isActive
                  ? 'border-neutral-900 ring-1 ring-neutral-900'
                  : 'border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {/* Mini preview */}
              <div
                className={`w-full aspect-[3/4] rounded-md ${t.bgColor} flex items-center justify-center relative overflow-hidden`}
              >
                {t.value === 'overlay' && (
                  <div
                    className='absolute inset-0'
                    style={{
                      backgroundImage:
                        'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)',
                      backgroundSize: '8px 8px',
                      backgroundPosition: '0 0, 4px 4px'
                    }}
                  />
                )}
                <div className='relative flex flex-col items-center gap-0.5'>
                  <div className={`w-1.5 h-1.5 rounded-full ${t.dotColor}`} />
                  <div className={`text-[9px] font-bold ${t.textColor}`}>10.0</div>
                  <div className={`text-[7px] ${t.textColor} opacity-60`}>km</div>
                </div>
              </div>

              <div className='flex flex-col items-center'>
                <span className='text-xs font-semibold text-neutral-800'>{t.name}</span>
                <span className='text-[10px] text-neutral-400'>{t.desc}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ThemePicker
