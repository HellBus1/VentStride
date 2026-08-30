import { forwardRef } from 'react'
import { ActivityInput, CardConfig } from '@/types'
import { calcPace, formatDistance, formatTime, formatDate } from '@/lib/formatters'

interface CardPreviewProps {
  activity: ActivityInput
  config: CardConfig
}

export const CardPreview = forwardRef<SVGSVGElement, CardPreviewProps>(
  ({ activity, config }, ref) => {
    const { layoutPreset, accentColor } = config
    const pace = calcPace(activity.distanceKm, activity.movingTimeSec)
    const distanceFormatted = formatDistance(activity.distanceKm)
    const timeFormatted = formatTime(activity.movingTimeSec)
    const dateFormatted = (formatDate(activity.date) || 'ACTIVITY DATE').toUpperCase()
    const titleFormatted = activity.title.trim() || 'Activity Session'

    const elevationGain = activity.elevationGain ?? 0
    const maxElevation = activity.maxElevation ?? 0
    const calories = activity.calories ?? 0

    return (
      <div className='w-full flex justify-center items-center'>
        {/* Aspect ratio container with shadow and luxury border */}
        <div className='relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-[#2A3828] bg-[#10140F] transition-all duration-300'>
          <svg
            ref={ref}
            viewBox='0 0 1080 1920'
            width='100%'
            height='100%'
            xmlns='http://www.w3.org/2000/svg'
            className='w-full h-full select-none'
            style={{
              backgroundColor: '#10140F'
            }}
          >
            <defs>
              {/* Subtle mesh/vignette gradient */}
              <radialGradient id='cardGlow' cx='50%' cy='30%' r='60%'>
                <stop offset='0%' stopColor={accentColor} stopOpacity='0.08' />
                <stop offset='100%' stopColor='#10140F' stopOpacity='0' />
              </radialGradient>

              {/* Linear accent glow */}
              <linearGradient id='accentLineGrad' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor={accentColor} stopOpacity='0.9' />
                <stop offset='70%' stopColor={accentColor} stopOpacity='0.3' />
                <stop offset='100%' stopColor={accentColor} stopOpacity='0' />
              </linearGradient>

              <filter id='subtleShadow' x='-10%' y='-10%' width='120%' height='120%'>
                <feDropShadow
                  dx='0'
                  dy='8'
                  stdDeviation='16'
                  floodColor='#000000'
                  floodOpacity='0.5'
                />
              </filter>
            </defs>

            {/* Background Texture & Glow */}
            <rect width='1080' height='1920' fill='#10140F' />
            <rect width='1080' height='1920' fill='url(#cardGlow)' />

            {/* Outer luxury framing border */}
            <rect
              x='50'
              y='50'
              width='980'
              height='1820'
              rx='40'
              fill='none'
              stroke='#2A3828'
              strokeWidth='2'
              strokeOpacity='0.8'
            />

            {/* Inner subtle frame */}
            <rect
              x='66'
              y='66'
              width='948'
              height='1788'
              rx='32'
              fill='none'
              stroke='#1A2318'
              strokeWidth='1.5'
            />

            {/* Top Corner Technical Crosshairs */}
            <path
              d='M 80 110 L 110 110 M 95 95 L 95 125'
              stroke={accentColor}
              strokeWidth='1.5'
              strokeOpacity='0.6'
            />
            <path
              d='M 970 110 L 1000 110 M 985 95 L 985 125'
              stroke={accentColor}
              strokeWidth='1.5'
              strokeOpacity='0.6'
            />
            <path
              d='M 80 1810 L 110 1810 M 95 1795 L 95 1825'
              stroke={accentColor}
              strokeWidth='1.5'
              strokeOpacity='0.6'
            />
            <path
              d='M 970 1810 L 1000 1810 M 985 1795 L 985 1825'
              stroke={accentColor}
              strokeWidth='1.5'
              strokeOpacity='0.6'
            />

            {/* Header: Date & Badge */}
            <g transform='translate(110, 180)'>
              {/* Category / Session Badge */}
              <rect
                x='0'
                y='0'
                width='140'
                height='44'
                rx='22'
                fill='#151C14'
                stroke='#2A3828'
                strokeWidth='1.5'
              />
              <circle cx='22' cy='22' r='5' fill={accentColor} />
              <text
                x='38'
                y='28'
                fill='#E8E4D9'
                fontFamily="'General Sans', sans-serif"
                fontSize='18'
                fontWeight='600'
                letterSpacing='1'
              >
                ACTIVITY
              </text>

              {/* Date String */}
              <text
                x='0'
                y='100'
                fill='#8A9986'
                fontFamily="'General Sans', sans-serif"
                fontSize='24'
                fontWeight='500'
                letterSpacing='2'
              >
                {dateFormatted}
              </text>

              {/* Activity Title */}
              <text
                x='0'
                y='170'
                fill='#E8E4D9'
                fontFamily="'General Sans', sans-serif"
                fontSize='48'
                fontWeight='700'
                letterSpacing='-0.5'
              >
                {titleFormatted.length > 28 ? `${titleFormatted.slice(0, 27)}…` : titleFormatted}
              </text>

              {/* Accent Divider Line */}
              <rect x='0' y='210' width='860' height='3' fill='url(#accentLineGrad)' rx='1.5' />
            </g>

            {/* ========================================================= */}
            {/* ESSENTIAL PRESET (3 Big Stats: Distance, Pace, Time)      */}
            {/* ========================================================= */}
            {layoutPreset === 'essential' && (
              <g transform='translate(110, 470)'>
                {/* 1. Distance Hero Block */}
                <g transform='translate(0, 50)'>
                  <text
                    x='0'
                    y='0'
                    fill='#8A9986'
                    fontFamily="'General Sans', sans-serif"
                    fontSize='24'
                    fontWeight='600'
                    letterSpacing='4'
                  >
                    DISTANCE
                  </text>

                  {/* Giant Cormorant Garamond Number */}
                  <text
                    x='0'
                    y='220'
                    fill='#E8E4D9'
                    fontFamily="'Cormorant Garamond', Georgia, serif"
                    fontSize='220'
                    fontWeight='600'
                    letterSpacing='-4'
                  >
                    {distanceFormatted}
                  </text>

                  {/* Unit Label */}
                  <text
                    x='10'
                    y='290'
                    fill={accentColor}
                    fontFamily="'General Sans', sans-serif"
                    fontSize='32'
                    fontWeight='700'
                    letterSpacing='6'
                  >
                    KILOMETERS
                  </text>
                </g>

                {/* Subtle Divider */}
                <line
                  x1='0'
                  y1='430'
                  x2='860'
                  y2='430'
                  stroke='#2A3828'
                  strokeWidth='2'
                  strokeDasharray='4 8'
                />

                {/* 2. Secondary Metrics Split (Pace & Time) */}
                <g transform='translate(0, 530)'>
                  {/* Left Column: Pace */}
                  <g transform='translate(0, 0)'>
                    <text
                      x='0'
                      y='0'
                      fill='#8A9986'
                      fontFamily="'General Sans', sans-serif"
                      fontSize='22'
                      fontWeight='600'
                      letterSpacing='3'
                    >
                      AVG PACE
                    </text>
                    <text
                      x='0'
                      y='120'
                      fill='#E8E4D9'
                      fontFamily="'Cormorant Garamond', Georgia, serif"
                      fontSize='120'
                      fontWeight='600'
                      letterSpacing='-2'
                    >
                      {pace.formatted}
                    </text>
                    <text
                      x='4'
                      y='170'
                      fill={accentColor}
                      fontFamily="'General Sans', sans-serif"
                      fontSize='22'
                      fontWeight='600'
                      letterSpacing='2'
                    >
                      /KM
                    </text>
                  </g>

                  {/* Vertical Divider */}
                  <line x1='430' y1='0' x2='430' y2='200' stroke='#2A3828' strokeWidth='1.5' />

                  {/* Right Column: Moving Time */}
                  <g transform='translate(480, 0)'>
                    <text
                      x='0'
                      y='0'
                      fill='#8A9986'
                      fontFamily="'General Sans', sans-serif"
                      fontSize='22'
                      fontWeight='600'
                      letterSpacing='3'
                    >
                      TIME
                    </text>
                    <text
                      x='0'
                      y='120'
                      fill='#E8E4D9'
                      fontFamily="'Cormorant Garamond', Georgia, serif"
                      fontSize='110'
                      fontWeight='600'
                      letterSpacing='-1'
                    >
                      {timeFormatted}
                    </text>
                    <text
                      x='4'
                      y='170'
                      fill={accentColor}
                      fontFamily="'General Sans', sans-serif"
                      fontSize='22'
                      fontWeight='600'
                      letterSpacing='2'
                    >
                      DURATION
                    </text>
                  </g>
                </g>

                {/* Decorative athletic contour pulse line */}
                <g transform='translate(0, 840)'>
                  <rect
                    x='0'
                    y='0'
                    width='860'
                    height='120'
                    rx='16'
                    fill='#151C14'
                    stroke='#2A3828'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M 40 60 Q 180 20, 300 60 T 560 60 T 720 40 T 820 60'
                    fill='none'
                    stroke={accentColor}
                    strokeWidth='3'
                    strokeOpacity='0.85'
                  />
                  <circle cx='820' cy='60' r='6' fill={accentColor} />
                </g>
              </g>
            )}

            {/* ========================================================= */}
            {/* DETAILED PRESET (6 Stat Grid)                             */}
            {/* ========================================================= */}
            {layoutPreset === 'detailed' && (
              <g transform='translate(110, 460)'>
                {/* Hero Distance */}
                <g transform='translate(0, 20)'>
                  <text
                    x='0'
                    y='0'
                    fill='#8A9986'
                    fontFamily="'General Sans', sans-serif"
                    fontSize='22'
                    fontWeight='600'
                    letterSpacing='3'
                  >
                    DISTANCE
                  </text>
                  <text
                    x='0'
                    y='150'
                    fill='#E8E4D9'
                    fontFamily="'Cormorant Garamond', Georgia, serif"
                    fontSize='160'
                    fontWeight='600'
                    letterSpacing='-3'
                  >
                    {distanceFormatted}
                  </text>
                  <text
                    x='6'
                    y='205'
                    fill={accentColor}
                    fontFamily="'General Sans', sans-serif"
                    fontSize='26'
                    fontWeight='700'
                    letterSpacing='4'
                  >
                    KM
                  </text>
                </g>

                <line x1='0' y1='260' x2='860' y2='260' stroke='#2A3828' strokeWidth='1.5' />

                {/* 2x2 Grid of Detailed Metrics */}
                <g transform='translate(0, 310)'>
                  {/* Row 1, Col 1: Pace */}
                  <g transform='translate(0, 0)'>
                    <text
                      x='0'
                      y='0'
                      fill='#8A9986'
                      fontFamily="'General Sans', sans-serif"
                      fontSize='20'
                      fontWeight='600'
                      letterSpacing='2'
                    >
                      AVG PACE
                    </text>
                    <text
                      x='0'
                      y='90'
                      fill='#E8E4D9'
                      fontFamily="'Cormorant Garamond', Georgia, serif"
                      fontSize='84'
                      fontWeight='600'
                    >
                      {pace.formatted}
                    </text>
                    <text
                      x='2'
                      y='130'
                      fill={accentColor}
                      fontFamily="'General Sans', sans-serif"
                      fontSize='18'
                      fontWeight='600'
                      letterSpacing='1'
                    >
                      /KM
                    </text>
                  </g>

                  {/* Row 1, Col 2: Moving Time */}
                  <g transform='translate(450, 0)'>
                    <text
                      x='0'
                      y='0'
                      fill='#8A9986'
                      fontFamily="'General Sans', sans-serif"
                      fontSize='20'
                      fontWeight='600'
                      letterSpacing='2'
                    >
                      MOVING TIME
                    </text>
                    <text
                      x='0'
                      y='90'
                      fill='#E8E4D9'
                      fontFamily="'Cormorant Garamond', Georgia, serif"
                      fontSize='84'
                      fontWeight='600'
                    >
                      {timeFormatted}
                    </text>
                    <text
                      x='2'
                      y='130'
                      fill={accentColor}
                      fontFamily="'General Sans', sans-serif"
                      fontSize='18'
                      fontWeight='600'
                      letterSpacing='1'
                    >
                      ELAPSED
                    </text>
                  </g>

                  <line
                    x1='0'
                    y1='180'
                    x2='860'
                    y2='180'
                    stroke='#2A3828'
                    strokeWidth='1'
                    strokeDasharray='3 6'
                  />

                  {/* Row 2, Col 1: Elevation Gain */}
                  <g transform='translate(0, 230)'>
                    <text
                      x='0'
                      y='0'
                      fill='#8A9986'
                      fontFamily="'General Sans', sans-serif"
                      fontSize='20'
                      fontWeight='600'
                      letterSpacing='2'
                    >
                      ELEVATION GAIN
                    </text>
                    <text
                      x='0'
                      y='90'
                      fill='#E8E4D9'
                      fontFamily="'Cormorant Garamond', Georgia, serif"
                      fontSize='84'
                      fontWeight='600'
                    >
                      {elevationGain}
                    </text>
                    <text
                      x='2'
                      y='130'
                      fill={accentColor}
                      fontFamily="'General Sans', sans-serif"
                      fontSize='18'
                      fontWeight='600'
                      letterSpacing='1'
                    >
                      METERS
                    </text>
                  </g>

                  {/* Row 2, Col 2: Max Elevation */}
                  <g transform='translate(450, 230)'>
                    <text
                      x='0'
                      y='0'
                      fill='#8A9986'
                      fontFamily="'General Sans', sans-serif"
                      fontSize='20'
                      fontWeight='600'
                      letterSpacing='2'
                    >
                      MAX ELEVATION
                    </text>
                    <text
                      x='0'
                      y='90'
                      fill='#E8E4D9'
                      fontFamily="'Cormorant Garamond', Georgia, serif"
                      fontSize='84'
                      fontWeight='600'
                    >
                      {maxElevation}
                    </text>
                    <text
                      x='2'
                      y='130'
                      fill={accentColor}
                      fontFamily="'General Sans', sans-serif"
                      fontSize='18'
                      fontWeight='600'
                      letterSpacing='1'
                    >
                      METERS
                    </text>
                  </g>

                  <line
                    x1='0'
                    y1='410'
                    x2='860'
                    y2='410'
                    stroke='#2A3828'
                    strokeWidth='1'
                    strokeDasharray='3 6'
                  />

                  {/* Row 3, Col 1: Calories */}
                  <g transform='translate(0, 460)'>
                    <text
                      x='0'
                      y='0'
                      fill='#8A9986'
                      fontFamily="'General Sans', sans-serif"
                      fontSize='20'
                      fontWeight='600'
                      letterSpacing='2'
                    >
                      ENERGY EXPENDED
                    </text>
                    <text
                      x='0'
                      y='90'
                      fill='#E8E4D9'
                      fontFamily="'Cormorant Garamond', Georgia, serif"
                      fontSize='84'
                      fontWeight='600'
                    >
                      {calories > 0 ? calories.toLocaleString() : '0'}
                    </text>
                    <text
                      x='2'
                      y='130'
                      fill={accentColor}
                      fontFamily="'General Sans', sans-serif"
                      fontSize='18'
                      fontWeight='600'
                      letterSpacing='1'
                    >
                      CALORIES (KCAL)
                    </text>
                  </g>
                </g>
              </g>
            )}

            {/* ========================================================= */}
            {/* FOOTER: VentStride Signature Watermark                    */}
            {/* ========================================================= */}
            <g transform='translate(110, 1720)'>
              <line x1='0' y1='0' x2='860' y2='0' stroke='#2A3828' strokeWidth='1.5' />

              {/* Brand wordmark */}
              <text
                x='0'
                y='45'
                fill='#E8E4D9'
                fontFamily="'General Sans', sans-serif"
                fontSize='22'
                fontWeight='700'
                letterSpacing='3'
              >
                VENTSTRIDE
              </text>
              <text
                x='0'
                y='75'
                fill='#8A9986'
                fontFamily="'General Sans', sans-serif"
                fontSize='16'
                fontWeight='500'
                letterSpacing='1'
              >
                STRAVA STAT GENERATOR
              </text>

              {/* Minimal geometric badge */}
              <rect
                x='760'
                y='20'
                width='100'
                height='40'
                rx='8'
                fill='#151C14'
                stroke='#2A3828'
                strokeWidth='1'
              />
              <text
                x='810'
                y='46'
                fill={accentColor}
                fontFamily="'General Sans', sans-serif"
                fontSize='16'
                fontWeight='700'
                textAnchor='middle'
                letterSpacing='2'
              >
                9:16
              </text>
            </g>
          </svg>
        </div>
      </div>
    )
  }
)

CardPreview.displayName = 'CardPreview'

export default CardPreview
