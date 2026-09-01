import { useState, useRef } from 'react'
import { ActivityInput, CardConfig, CardRatio, CardTheme, CardDesign, LayoutPreset } from '@/types'
import { DEFAULT_ACCENT } from '@/constants/accentColors'
import ActivityForm from '@/components/ActivityForm/ActivityForm'
import LayoutPresetPicker from '@/components/LayoutPresetPicker/LayoutPresetPicker'
import AccentPicker from '@/components/AccentPicker/AccentPicker'
import RatioPicker from '@/components/RatioPicker/RatioPicker'
import ThemePicker from '@/components/ThemePicker/ThemePicker'
import DesignPicker from '@/components/DesignPicker/DesignPicker'
import CardPreview, { CardPreviewHandle } from '@/components/CardPreview/CardPreview'
import ExportButtons from '@/components/ExportButtons/ExportButtons'
import { getCardDimensions } from '@/lib/cardRenderer'

export const HomePage = () => {
  const todayStr = new Date().toISOString().split('T')[0]

  const [activity, setActivity] = useState<ActivityInput>({
    title: 'Morning Threshold Run',
    date: todayStr,
    distanceKm: 13.34,
    movingTimeSec: 5668, // 1h 34m 28s -> ~7:07 /km
    elevationGain: 65,
    maxElevation: 83,
    calories: 1071
  })

  const [cardConfig, setCardConfig] = useState<CardConfig>({
    layoutPreset: 'essential',
    visibleStats: ['distance', 'pace', 'movingTime'],
    accentColor: DEFAULT_ACCENT,
    ratio: '9:16',
    theme: 'overlay',
    design: 'stacked',
    customWidth: 1080,
    customHeight: 1920,
    lockAspectRatio: true
  })

  const cardPreviewRef = useRef<CardPreviewHandle>(null)

  const handleRatioChange = (ratio: CardRatio) => {
    setCardConfig((prev) => ({ ...prev, ratio }))
  }

  const handleThemeChange = (theme: CardTheme) => {
    setCardConfig((prev) => ({ ...prev, theme }))
  }

  const handleDesignChange = (design: CardDesign) => {
    setCardConfig((prev) => ({
      ...prev,
      design,
      layoutPreset: design === 'grid' ? 'detailed' : prev.layoutPreset
    }))
  }

  const handlePresetChange = (preset: LayoutPreset) => {
    setCardConfig((prev) => ({
      ...prev,
      layoutPreset: preset,
      design: preset === 'detailed' ? 'grid' : prev.design,
      visibleStats:
        preset === 'essential'
          ? ['distance', 'pace', 'movingTime']
          : ['distance', 'pace', 'movingTime', 'elevationGain', 'maxElevation', 'calories']
    }))
  }

  const handleAccentChange = (hex: string) => {
    setCardConfig((prev) => ({ ...prev, accentColor: hex }))
  }

  const { w, h } = getCardDimensions(cardConfig)

  return (
    <div className='w-full min-h-[calc(100dvh-3.5rem)] bg-[#FBFBFA] py-8 sm:py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Split Studio Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start'>
          {/* Left Column: Form Controls (~45% / 5 cols) */}
          <div className='lg:col-span-5 flex flex-col gap-5'>
            {/* Header */}
            <div className='flex flex-col gap-1'>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight'>
                Activity Card Studio
              </h1>
              <p className='text-xs sm:text-sm text-neutral-500 leading-relaxed'>
                Generate high-resolution transparent overlays and share cards for Instagram Stories
                & social media.
              </p>
            </div>

            {/* Theme Picker */}
            <div className='p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-xs'>
              <ThemePicker theme={cardConfig.theme} onChange={handleThemeChange} />
            </div>

            {/* Design Style Picker */}
            <div className='p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-xs'>
              <DesignPicker design={cardConfig.design} onChange={handleDesignChange} />
            </div>

            {/* Ratio & Resizing Picker */}
            <div className='p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-xs'>
              <RatioPicker
                ratio={cardConfig.ratio}
                customWidth={cardConfig.customWidth}
                customHeight={cardConfig.customHeight}
                lockAspectRatio={cardConfig.lockAspectRatio}
                onRatioChange={handleRatioChange}
                onWidthChange={(w) => setCardConfig((prev) => ({ ...prev, customWidth: w }))}
                onHeightChange={(h) => setCardConfig((prev) => ({ ...prev, customHeight: h }))}
                onLockToggle={(locked) =>
                  setCardConfig((prev) => ({ ...prev, lockAspectRatio: locked }))
                }
              />
            </div>

            {/* Stats Preset (Essential / Detailed) */}
            <div className='p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-xs'>
              <LayoutPresetPicker preset={cardConfig.layoutPreset} onChange={handlePresetChange} />
            </div>

            {/* Accent Color */}
            <div className='p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-xs'>
              <AccentPicker selectedHex={cardConfig.accentColor} onChange={handleAccentChange} />
            </div>

            {/* Activity Form */}
            <div className='p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-xs'>
              <div className='flex items-center justify-between mb-3'>
                <span className='text-xs font-bold uppercase tracking-wider text-neutral-500'>
                  Workout Statistics
                </span>
                <span className='text-[11px] text-neutral-400'>Live sync</span>
              </div>
              <ActivityForm
                activity={activity}
                onChange={setActivity}
                preset={cardConfig.layoutPreset}
              />
            </div>

            {/* Export Actions */}
            <div className='p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-xs'>
              <ExportButtons
                cardPreviewRef={cardPreviewRef}
                activityTitle={activity.title}
                config={cardConfig}
              />
            </div>
          </div>

          {/* Right Column: Live Card Canvas Preview (~55% / 7 cols) */}
          <div className='lg:col-span-7 flex flex-col items-center justify-start lg:sticky lg:top-20'>
            <div className='w-full flex items-center justify-between px-1 mb-2'>
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                <span className='text-xs font-bold uppercase tracking-wider text-neutral-600'>
                  Live Canvas Preview
                </span>
              </div>
              <span className='text-[11px] font-mono text-neutral-400 font-medium'>
                {w} × {h} px
              </span>
            </div>

            {/* Interactive Canvas Card */}
            <CardPreview ref={cardPreviewRef} activity={activity} config={cardConfig} />

            {/* Helpful instructions */}
            <p className='mt-3 text-xs text-neutral-400 text-center max-w-md'>
              {cardConfig.theme === 'overlay'
                ? 'Checkerboard shows transparency. Click Download PNG to get a clean sticker overlay ready for Instagram Stories.'
                : 'Rendered with bold athletic typography for crisp social sharing.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
