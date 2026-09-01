import { useState, useRef } from 'react'
import {
  ActivityInput,
  CardConfig,
  CardRatio,
  CardOrientation,
  CardTheme,
  CardDesign
} from '@/types'
import { DEFAULT_ACCENT } from '@/constants/accentColors'
import ActivityForm from '@/components/ActivityForm/ActivityForm'
import AccentPicker from '@/components/AccentPicker/AccentPicker'
import RatioPicker from '@/components/RatioPicker/RatioPicker'
import ThemePicker from '@/components/ThemePicker/ThemePicker'
import DesignPicker from '@/components/DesignPicker/DesignPicker'
import CardPreview, { CardPreviewHandle } from '@/components/CardPreview/CardPreview'
import ExportButtons from '@/components/ExportButtons/ExportButtons'
import { getCardDimensions } from '@/lib/cardRenderer'
import { Sparkle } from '@phosphor-icons/react'

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
    accentColor: DEFAULT_ACCENT,
    ratio: '9:16',
    orientation: 'vertical',
    theme: 'overlay',
    design: 'stacked'
  })

  const cardPreviewRef = useRef<CardPreviewHandle>(null)

  const handleRatioChange = (ratio: CardRatio) => {
    setCardConfig((prev) => ({ ...prev, ratio }))
  }

  const handleOrientationChange = (orientation: CardOrientation) => {
    setCardConfig((prev) => ({ ...prev, orientation }))
  }

  const handleThemeChange = (theme: CardTheme) => {
    setCardConfig((prev) => ({ ...prev, theme }))
  }

  const handleDesignChange = (design: CardDesign) => {
    setCardConfig((prev) => ({
      ...prev,
      design,
      orientation:
        design === 'stacked' ? 'vertical' : design === 'grid' ? 'horizontal' : prev.orientation
    }))
  }

  const handleAccentChange = (hex: string) => {
    setCardConfig((prev) => ({ ...prev, accentColor: hex }))
  }

  const { w, h } = getCardDimensions(cardConfig)

  return (
    <div className='w-full bg-[#FBFBFA] py-6 sm:py-10 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Mobile & Desktop Responsive Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start'>
          {/* Form Controls Column (Top on mobile, Left on desktop) */}
          <div className='order-2 lg:order-1 lg:col-span-5 flex flex-col gap-4 sm:gap-5'>
            {/* Headline */}
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-1.5 text-xs font-bold text-[#E8590C] uppercase tracking-wider'>
                <Sparkle size={14} weight='fill' />
                <span>Instagram Story Studio</span>
              </div>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight'>
                Turn your run into a shareable sticker.
              </h1>
              <p className='text-xs sm:text-sm text-neutral-500 leading-relaxed'>
                Generate crisp transparent overlays and cards for Instagram Stories & social media.
              </p>
            </div>

            {/* 1. Theme Picker (Overlay / Classic / Clean) */}
            <div className='p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-xs'>
              <ThemePicker theme={cardConfig.theme} onChange={handleThemeChange} />
            </div>

            {/* 2. Card Design Layout (Stacked Hero / Grid Matrix / Bottom Overlay) */}
            <div className='p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-xs'>
              <DesignPicker design={cardConfig.design} onChange={handleDesignChange} />
            </div>

            {/* 3. Aspect Ratio (9:16 & 3:4) */}
            <div className='p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-xs'>
              <RatioPicker
                config={cardConfig}
                onRatioChange={handleRatioChange}
                onOrientationChange={handleOrientationChange}
              />
            </div>

            {/* 4. Accent Color Swatches */}
            <div className='p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-xs'>
              <AccentPicker selectedHex={cardConfig.accentColor} onChange={handleAccentChange} />
            </div>

            {/* 5. Workout Data Form */}
            <div className='p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-xs'>
              <div className='flex items-center justify-between mb-3'>
                <span className='text-xs font-bold uppercase tracking-wider text-neutral-600'>
                  Workout Statistics
                </span>
                <span className='text-[11px] text-green-600 font-medium'>Live Preview</span>
              </div>
              <ActivityForm activity={activity} design={cardConfig.design} onChange={setActivity} />
            </div>

            {/* 6. Export Actions */}
            <div className='p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-xs'>
              <ExportButtons
                cardPreviewRef={cardPreviewRef}
                activityTitle={activity.title}
                config={cardConfig}
              />
            </div>
          </div>

          {/* Live Card Preview Column (Sticky on desktop, top view on mobile) */}
          <div className='order-1 lg:order-2 lg:col-span-7 flex flex-col items-center justify-start lg:sticky lg:top-20'>
            <div className='w-full flex items-center justify-between px-1 mb-2.5'>
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                <span className='text-xs font-bold uppercase tracking-wider text-neutral-600'>
                  Live Canvas Preview
                </span>
              </div>
              <span className='text-[11px] font-mono text-neutral-500 font-semibold bg-neutral-200/60 px-2 py-0.5 rounded'>
                {w} × {h} px
              </span>
            </div>

            {/* Live Canvas Component */}
            <CardPreview ref={cardPreviewRef} activity={activity} config={cardConfig} />

            {/* Guidance note */}
            <p className='mt-2.5 text-[11px] text-neutral-400 text-center max-w-sm px-2'>
              {cardConfig.theme === 'overlay'
                ? 'Checkerboard shows transparency. When exported as PNG, drop it directly over your workout photo on Instagram Stories.'
                : 'Full card rendered at clean resolution for social media.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
