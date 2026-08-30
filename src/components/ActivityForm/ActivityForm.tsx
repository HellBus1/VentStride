import React from 'react'
import { ActivityInput, LayoutPreset } from '@/types'
import { calcPace } from '@/lib/formatters'
import { Timer, Compass, Fire, TrendUp } from '@phosphor-icons/react'

interface ActivityFormProps {
  activity: ActivityInput
  onChange: (activity: ActivityInput) => void
  preset: LayoutPreset
  accentColor: string
}

export const ActivityForm: React.FC<ActivityFormProps> = ({
  activity,
  onChange,
  preset,
  accentColor
}) => {
  // Convert movingTimeSec to hours, minutes, seconds for friendly inputs
  const hours = Math.floor(activity.movingTimeSec / 3600)
  const minutes = Math.floor((activity.movingTimeSec % 3600) / 60)
  const seconds = activity.movingTimeSec % 60

  const handleTimeChange = (newHours: number, newMinutes: number, newSeconds: number) => {
    const totalSec = Math.max(0, newHours * 3600 + newMinutes * 60 + newSeconds)
    onChange({
      ...activity,
      movingTimeSec: totalSec
    })
  }

  const calculatedPace = calcPace(activity.distanceKm, activity.movingTimeSec)

  return (
    <form className='flex flex-col gap-5' onSubmit={(e) => e.preventDefault()}>
      {/* Activity Title & Type */}
      <div className='flex flex-col gap-2'>
        <label className='text-xs font-semibold uppercase tracking-wider text-[#8A9986]'>
          Activity Title
        </label>
        <div className='flex gap-2'>
          <input
            type='text'
            value={activity.title}
            onChange={(e) => onChange({ ...activity, title: e.target.value })}
            placeholder='e.g. Morning Threshold Run'
            className='flex-1 bg-[#151C14] border border-[#2A3828] rounded-xl px-3.5 py-2.5 text-sm text-[#E8E4D9] placeholder-[#5A6856] focus:outline-none focus:border-[#DDB967] transition-colors'
            style={{
              // @ts-expect-error custom property for dynamic focus ring
              '--focus-color': accentColor
            }}
          />
        </div>
      </div>

      {/* Date */}
      <div className='flex flex-col gap-2'>
        <label className='text-xs font-semibold uppercase tracking-wider text-[#8A9986]'>
          Date
        </label>
        <input
          type='date'
          value={activity.date}
          onChange={(e) => onChange({ ...activity, date: e.target.value })}
          className='w-full bg-[#151C14] border border-[#2A3828] rounded-xl px-3.5 py-2.5 text-sm text-[#E8E4D9] focus:outline-none focus:border-[#DDB967] transition-colors'
        />
      </div>

      {/* Primary Metrics: Distance & Moving Time */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {/* Distance */}
        <div className='flex flex-col gap-2'>
          <label className='text-xs font-semibold uppercase tracking-wider text-[#8A9986] flex items-center justify-between'>
            <span>Distance (km)</span>
          </label>
          <div className='relative'>
            <input
              type='number'
              step='0.01'
              min='0'
              value={activity.distanceKm || ''}
              onChange={(e) =>
                onChange({
                  ...activity,
                  distanceKm: parseFloat(e.target.value) || 0
                })
              }
              placeholder='10.00'
              className='w-full bg-[#151C14] border border-[#2A3828] rounded-xl px-3.5 py-2.5 text-sm text-[#E8E4D9] placeholder-[#5A6856] focus:outline-none focus:border-[#DDB967] transition-colors pr-10'
            />
            <span className='absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8A9986] font-medium pointer-events-none'>
              km
            </span>
          </div>
        </div>

        {/* Moving Time (H:M:S split) */}
        <div className='flex flex-col gap-2'>
          <label className='text-xs font-semibold uppercase tracking-wider text-[#8A9986] flex items-center gap-1.5'>
            <Timer size={14} className='text-[#8A9986]' />
            <span>Moving Time</span>
          </label>
          <div className='grid grid-cols-3 gap-1.5'>
            <div className='relative'>
              <input
                type='number'
                min='0'
                max='99'
                value={hours || ''}
                onChange={(e) => handleTimeChange(parseInt(e.target.value) || 0, minutes, seconds)}
                placeholder='0'
                className='w-full bg-[#151C14] border border-[#2A3828] rounded-xl px-2.5 py-2.5 text-sm text-[#E8E4D9] text-center focus:outline-none focus:border-[#DDB967] transition-colors'
              />
              <span className='absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#8A9986] pointer-events-none'>
                h
              </span>
            </div>
            <div className='relative'>
              <input
                type='number'
                min='0'
                max='59'
                value={minutes || ''}
                onChange={(e) => handleTimeChange(hours, parseInt(e.target.value) || 0, seconds)}
                placeholder='45'
                className='w-full bg-[#151C14] border border-[#2A3828] rounded-xl px-2.5 py-2.5 text-sm text-[#E8E4D9] text-center focus:outline-none focus:border-[#DDB967] transition-colors'
              />
              <span className='absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#8A9986] pointer-events-none'>
                m
              </span>
            </div>
            <div className='relative'>
              <input
                type='number'
                min='0'
                max='59'
                value={seconds || ''}
                onChange={(e) => handleTimeChange(hours, minutes, parseInt(e.target.value) || 0)}
                placeholder='0'
                className='w-full bg-[#151C14] border border-[#2A3828] rounded-xl px-2.5 py-2.5 text-sm text-[#E8E4D9] text-center focus:outline-none focus:border-[#DDB967] transition-colors'
              />
              <span className='absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#8A9986] pointer-events-none'>
                s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculated Pace Indicator */}
      <div className='px-3.5 py-2.5 bg-[#151C14]/80 border border-[#2A3828]/60 rounded-xl flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full' style={{ backgroundColor: accentColor }} />
          <span className='text-xs text-[#8A9986]'>Calculated Pace</span>
        </div>
        <span className='text-xs font-semibold text-[#E8E4D9]'>
          {calculatedPace.formatted} <span className='text-[#8A9986] font-normal'>/km</span>
        </span>
      </div>

      {/* Optional Detailed Preset Fields */}
      {preset === 'detailed' && (
        <div className='pt-3 border-t border-[#2A3828]/60 flex flex-col gap-4 animate-in fade-in duration-200'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-semibold uppercase tracking-wider text-[#DDB967]'>
              Detailed Metrics
            </span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {/* Elevation Gain */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-[11px] font-medium text-[#8A9986] flex items-center gap-1'>
                <TrendUp size={13} />
                <span>Elevation Gain</span>
              </label>
              <div className='relative'>
                <input
                  type='number'
                  min='0'
                  value={activity.elevationGain ?? ''}
                  onChange={(e) =>
                    onChange({
                      ...activity,
                      elevationGain: e.target.value ? parseInt(e.target.value) : undefined
                    })
                  }
                  placeholder='145'
                  className='w-full bg-[#151C14] border border-[#2A3828] rounded-xl px-3 py-2 text-sm text-[#E8E4D9] focus:outline-none focus:border-[#DDB967] transition-colors pr-7'
                />
                <span className='absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8A9986]'>
                  m
                </span>
              </div>
            </div>

            {/* Max Elevation */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-[11px] font-medium text-[#8A9986] flex items-center gap-1'>
                <Compass size={13} />
                <span>Max Elevation</span>
              </label>
              <div className='relative'>
                <input
                  type='number'
                  min='0'
                  value={activity.maxElevation ?? ''}
                  onChange={(e) =>
                    onChange({
                      ...activity,
                      maxElevation: e.target.value ? parseInt(e.target.value) : undefined
                    })
                  }
                  placeholder='280'
                  className='w-full bg-[#151C14] border border-[#2A3828] rounded-xl px-3 py-2 text-sm text-[#E8E4D9] focus:outline-none focus:border-[#DDB967] transition-colors pr-7'
                />
                <span className='absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8A9986]'>
                  m
                </span>
              </div>
            </div>

            {/* Calories */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-[11px] font-medium text-[#8A9986] flex items-center gap-1'>
                <Fire size={13} />
                <span>Calories</span>
              </label>
              <div className='relative'>
                <input
                  type='number'
                  min='0'
                  value={activity.calories ?? ''}
                  onChange={(e) =>
                    onChange({
                      ...activity,
                      calories: e.target.value ? parseInt(e.target.value) : undefined
                    })
                  }
                  placeholder='650'
                  className='w-full bg-[#151C14] border border-[#2A3828] rounded-xl px-3 py-2 text-sm text-[#E8E4D9] focus:outline-none focus:border-[#DDB967] transition-colors pr-10'
                />
                <span className='absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8A9986]'>
                  kcal
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

export default ActivityForm
