import React from 'react'
import { ActivityInput, LayoutPreset } from '@/types'
import { calcPace } from '@/lib/formatters'
import { Timer, Compass, Fire, TrendUp } from '@phosphor-icons/react'

interface ActivityFormProps {
  activity: ActivityInput
  onChange: (activity: ActivityInput) => void
  preset: LayoutPreset
}

export const ActivityForm: React.FC<ActivityFormProps> = ({ activity, onChange, preset }) => {
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
    <form className='flex flex-col gap-4' onSubmit={(e) => e.preventDefault()}>
      {/* Title */}
      <div className='flex flex-col gap-1.5'>
        <label className='text-xs font-semibold uppercase tracking-wider text-neutral-500'>
          Activity Title
        </label>
        <input
          type='text'
          value={activity.title}
          onChange={(e) => onChange({ ...activity, title: e.target.value })}
          placeholder='e.g. Morning Run'
          className='w-full py-2.5 px-3.5 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all'
        />
      </div>

      {/* Date */}
      <div className='flex flex-col gap-1.5'>
        <label className='text-xs font-semibold uppercase tracking-wider text-neutral-500'>
          Date
        </label>
        <input
          type='date'
          value={activity.date}
          onChange={(e) => onChange({ ...activity, date: e.target.value })}
          className='w-full py-2.5 px-3.5 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all'
        />
      </div>

      {/* Distance & Time Split */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {/* Distance */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-semibold uppercase tracking-wider text-neutral-500'>
            Distance (km)
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
              className='w-full py-2.5 px-3.5 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all pr-10'
            />
            <span className='absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-400 pointer-events-none'>
              km
            </span>
          </div>
        </div>

        {/* Moving Time */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-1'>
            <Timer size={13} />
            <span>Moving Time</span>
          </label>
          <div className='grid grid-cols-3 gap-1'>
            <div className='relative'>
              <input
                type='number'
                min='0'
                max='99'
                value={hours || ''}
                onChange={(e) => handleTimeChange(parseInt(e.target.value) || 0, minutes, seconds)}
                placeholder='0'
                className='w-full py-2.5 px-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm text-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all'
              />
              <span className='absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 pointer-events-none'>
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
                className='w-full py-2.5 px-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm text-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all'
              />
              <span className='absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 pointer-events-none'>
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
                className='w-full py-2.5 px-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm text-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all'
              />
              <span className='absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 pointer-events-none'>
                s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculated Pace banner */}
      <div className='p-2.5 bg-neutral-100/80 rounded-lg flex items-center justify-between text-xs'>
        <span className='text-neutral-500 font-medium'>Auto-Calculated Pace</span>
        <span className='font-semibold text-neutral-800'>
          {calculatedPace.formatted} <span className='text-neutral-500 font-normal'>/km</span>
        </span>
      </div>

      {/* Detailed metrics */}
      {preset === 'detailed' && (
        <div className='pt-3 border-t border-neutral-200 flex flex-col gap-3'>
          <span className='text-xs font-semibold uppercase tracking-wider text-neutral-500'>
            Additional Metrics
          </span>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-2.5'>
            {/* Elev Gain */}
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] font-medium text-neutral-500 flex items-center gap-1'>
                <TrendUp size={12} />
                <span>Elev Gain</span>
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
                  placeholder='120'
                  className='w-full py-2 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 pr-7'
                />
                <span className='absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400'>
                  m
                </span>
              </div>
            </div>

            {/* Max Elev */}
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] font-medium text-neutral-500 flex items-center gap-1'>
                <Compass size={12} />
                <span>Max Elev</span>
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
                  placeholder='240'
                  className='w-full py-2 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 pr-7'
                />
                <span className='absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400'>
                  m
                </span>
              </div>
            </div>

            {/* Calories */}
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] font-medium text-neutral-500 flex items-center gap-1'>
                <Fire size={12} />
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
                  className='w-full py-2 px-3 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 pr-9'
                />
                <span className='absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400'>
                  cal
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
