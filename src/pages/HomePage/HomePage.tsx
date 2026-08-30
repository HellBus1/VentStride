import { useState, useRef } from 'react'
import { ActivityInput, CardConfig, LayoutPreset } from '@/types'
import { DEFAULT_ACCENT } from '@/constants/accentColors'
import ActivityForm from '@/components/ActivityForm/ActivityForm'
import LayoutPresetPicker from '@/components/LayoutPresetPicker/LayoutPresetPicker'
import AccentPicker from '@/components/AccentPicker/AccentPicker'
import CardPreview from '@/components/CardPreview/CardPreview'
import ExportButtons from '@/components/ExportButtons/ExportButtons'
import { ArrowBendRightDown } from '@phosphor-icons/react'

export const HomePage = () => {
  const todayStr = new Date().toISOString().split('T')[0]

  // Activity input state
  const [activity, setActivity] = useState<ActivityInput>({
    title: 'Morning Threshold Run',
    date: todayStr,
    distanceKm: 10.0,
    movingTimeSec: 2840, // 47m 20s -> ~4:44 /km
    elevationGain: 125,
    maxElevation: 240,
    calories: 680
  })

  // Card configuration state
  const [cardConfig, setCardConfig] = useState<CardConfig>({
    layoutPreset: 'essential',
    visibleStats: ['distance', 'pace', 'movingTime'],
    accentColor: DEFAULT_ACCENT
  })

  const svgRef = useRef<SVGSVGElement>(null)

  const handlePresetChange = (preset: LayoutPreset) => {
    setCardConfig((prev) => ({
      ...prev,
      layoutPreset: preset,
      visibleStats:
        preset === 'essential'
          ? ['distance', 'pace', 'movingTime']
          : ['distance', 'pace', 'movingTime', 'elevationGain', 'maxElevation', 'calories']
    }))
  }

  const handleAccentChange = (hex: string) => {
    setCardConfig((prev) => ({
      ...prev,
      accentColor: hex
    }))
  }

  return (
    <div className='w-full min-h-[calc(100dvh-4rem)] bg-[#10140F] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Asymmetric Split Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start'>
          {/* Left Column: Headline + Form Controls (~38-42% / 5 cols) */}
          <div className='lg:col-span-5 flex flex-col gap-8'>
            {/* Off-center deliberate headline */}
            <div className='flex flex-col gap-2'>
              <span className='text-xs font-semibold uppercase tracking-[0.2em] text-[#8A9986]'>
                Strava Share Card Studio
              </span>
              <h1 className='text-4xl sm:text-5xl font-serif font-semibold text-[#E8E4D9] tracking-tight leading-[1.05]'>
                Turn your stride into a statement.
              </h1>
              <p className='text-sm text-[#8A9986] leading-relaxed max-w-[45ch] mt-1'>
                Generate high-contrast stat cards for Instagram Stories & TikTok. No subscription,
                no account required.
              </p>
            </div>

            {/* Layout Preset Selector */}
            <div className='p-4 sm:p-5 bg-[#151C14] border border-[#2A3828] rounded-2xl flex flex-col gap-4'>
              <LayoutPresetPicker
                preset={cardConfig.layoutPreset}
                onChange={handlePresetChange}
                accentColor={cardConfig.accentColor}
              />
            </div>

            {/* Accent Color Swatches */}
            <div className='p-4 sm:p-5 bg-[#151C14] border border-[#2A3828] rounded-2xl'>
              <AccentPicker selectedHex={cardConfig.accentColor} onChange={handleAccentChange} />
            </div>

            {/* Activity Data Form */}
            <div className='p-4 sm:p-5 bg-[#151C14] border border-[#2A3828] rounded-2xl'>
              <div className='flex items-center justify-between mb-4'>
                <span className='text-xs font-semibold uppercase tracking-wider text-[#8A9986]'>
                  Activity Parameters
                </span>
                <span className='text-[11px] text-[#5A6856]'>Live Preview</span>
              </div>
              <ActivityForm
                activity={activity}
                onChange={setActivity}
                preset={cardConfig.layoutPreset}
                accentColor={cardConfig.accentColor}
              />
            </div>

            {/* Export Actions (Desktop & Tablet) */}
            <div className='p-4 sm:p-5 bg-[#151C14] border border-[#2A3828] rounded-2xl flex flex-col gap-3'>
              <span className='text-xs font-semibold uppercase tracking-wider text-[#8A9986]'>
                Export & Share
              </span>
              <ExportButtons
                svgRef={svgRef}
                accentColor={cardConfig.accentColor}
                activityTitle={activity.title}
              />
            </div>
          </div>

          {/* Right Column: Live SVG Card Preview (~58-62% / 7 cols) */}
          <div className='lg:col-span-7 flex flex-col items-center justify-start lg:sticky lg:top-24'>
            <div className='w-full flex items-center justify-between px-2 mb-3'>
              <div className='flex items-center gap-2'>
                <div
                  className='w-2 h-2 rounded-full animate-pulse'
                  style={{ backgroundColor: cardConfig.accentColor }}
                />
                <span className='text-xs font-medium uppercase tracking-wider text-[#8A9986]'>
                  Live Card Preview (9:16)
                </span>
              </div>
              <div className='hidden sm:flex items-center gap-1 text-[11px] text-[#5A6856]'>
                <span>1080 × 1920 SVG</span>
                <ArrowBendRightDown size={14} className='text-[#8A9986]' />
              </div>
            </div>

            {/* SVG Card Component */}
            <CardPreview ref={svgRef} activity={activity} config={cardConfig} />

            {/* Subtle disclaimer */}
            <div className='mt-4 text-center'>
              <p className='text-[11px] text-[#5A6856]'>
                Rendered with embedded typography. Click &apos;Download PNG&apos; for instant
                high-res output.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
