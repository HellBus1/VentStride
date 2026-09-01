/**
 * Canvas Card Rendering Engine
 * Uses Plus Jakarta Sans with bold athletic typography matching Strava cards.
 */
import { ActivityInput, CardConfig, RATIO_DIMENSIONS } from '@/types'
import { calcPace, formatDistance, formatTime, formatDate } from '@/lib/formatters'

export async function ensureFontsLoaded(): Promise<void> {
  if (document.fonts) {
    try {
      await document.fonts.load('700 48px "Plus Jakarta Sans"')
      await document.fonts.load('800 96px "Plus Jakarta Sans"')
      await document.fonts.ready
    } catch {
      // ignore
    }
  }
}

interface ThemeColors {
  bg: string | null // null = transparent
  text: string
  subtext: string
  muted: string
  accent: string
  badgeBg: string
  border: string
  shadow: boolean
}

function getThemeColors(theme: CardConfig['theme'], accent: string): ThemeColors {
  switch (theme) {
    case 'overlay':
      return {
        bg: null,
        text: '#FFFFFF',
        subtext: '#FFFFFF',
        muted: 'rgba(255, 255, 255, 0.75)',
        accent: accent || '#FFFFFF',
        badgeBg: 'rgba(0, 0, 0, 0.45)',
        border: 'rgba(255, 255, 255, 0.25)',
        shadow: true
      }
    case 'classic':
      return {
        bg: '#10140F',
        text: '#F5F5F0',
        subtext: '#E8E4D9',
        muted: '#8A9986',
        accent: accent || '#DDB967',
        badgeBg: '#1A2318',
        border: '#2A3828',
        shadow: false
      }
    case 'clean':
      return {
        bg: '#FFFFFF',
        text: '#111111',
        subtext: '#262626',
        muted: '#737373',
        accent: accent || '#E8590C',
        badgeBg: '#F5F5F5',
        border: '#E5E5E5',
        shadow: false
      }
  }
}

function setShadow(ctx: CanvasRenderingContext2D, enable: boolean) {
  if (enable) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.75)'
    ctx.shadowBlur = 16
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 4
  } else {
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
  }
}

export function getCardDimensions(config: CardConfig): { w: number; h: number } {
  if (config.ratio === 'custom') {
    return {
      w: Math.max(400, Math.min(3000, config.customWidth || 1080)),
      h: Math.max(400, Math.min(3000, config.customHeight || 1920))
    }
  }
  return RATIO_DIMENSIONS[config.ratio] || { w: 1080, h: 1920 }
}

export function renderCard(
  canvas: HTMLCanvasElement,
  activity: ActivityInput,
  config: CardConfig
): void {
  const { w, h } = getCardDimensions(config)
  canvas.width = w
  canvas.height = h

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const colors = getThemeColors(config.theme, config.accentColor)
  const pace = calcPace(activity.distanceKm, activity.movingTimeSec)
  const distStr = `${formatDistance(activity.distanceKm)} km`
  const timeStr = formatTime(activity.movingTimeSec)
  const paceStr = `${pace.formatted} /km`
  const dateStr = formatDate(activity.date) || 'TODAY'
  const titleStr = activity.title.trim() || 'Activity'

  const elevGainStr = `${activity.elevationGain ?? 0} m`
  const maxElevStr = `${activity.maxElevation ?? 0} m`
  const caloriesStr = `${(activity.calories ?? 0).toLocaleString()} Cal`

  // Scale factor relative to 1080 base
  const scale = w / 1080

  // 1. Clear background
  ctx.clearRect(0, 0, w, h)

  if (colors.bg) {
    ctx.fillStyle = colors.bg
    ctx.fillRect(0, 0, w, h)

    // Optional decorative frame for classic theme
    if (config.theme === 'classic') {
      ctx.strokeStyle = colors.border
      ctx.lineWidth = Math.round(2 * scale)
      ctx.strokeRect(
        Math.round(40 * scale),
        Math.round(40 * scale),
        w - Math.round(80 * scale),
        h - Math.round(80 * scale)
      )
    }
  }

  // 2. Render based on design preset
  if (config.design === 'grid' || config.layoutPreset === 'detailed') {
    renderGridLayout(
      ctx,
      { distStr, paceStr, timeStr, elevGainStr, maxElevStr, caloriesStr, titleStr, dateStr },
      colors,
      scale,
      w,
      h
    )
  } else if (config.design === 'bottom-badge') {
    renderBottomBadgeLayout(
      ctx,
      { distStr, paceStr, timeStr, titleStr, dateStr },
      colors,
      scale,
      w,
      h
    )
  } else {
    // Default 'stacked' hero layout (Directly matching Strava reference)
    renderStackedHeroLayout(
      ctx,
      { distStr, paceStr, timeStr, titleStr, dateStr },
      colors,
      scale,
      w,
      h
    )
  }
}

/**
 * Stacked Hero Layout (Matches Strava reference screenshot #1 & #4)
 * Large, centered bold statistics with strong visual hierarchy.
 */
function renderStackedHeroLayout(
  ctx: CanvasRenderingContext2D,
  stats: { distStr: string; paceStr: string; timeStr: string; titleStr: string; dateStr: string },
  colors: ThemeColors,
  scale: number,
  w: number,
  h: number
) {
  setShadow(ctx, colors.shadow)

  // Title / Date Header (top area)
  const topY = Math.round(h * 0.12)

  ctx.textAlign = 'center'
  ctx.fillStyle = colors.muted
  ctx.font = `600 ${Math.round(22 * scale)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText(stats.dateStr.toUpperCase(), w / 2, topY)

  ctx.fillStyle = colors.text
  ctx.font = `700 ${Math.round(36 * scale)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText(stats.titleStr, w / 2, topY + Math.round(44 * scale))

  // Center Stats Group
  const centerY = Math.round(h * 0.38)
  const spacing = Math.round(180 * scale)

  // 1. Distance
  drawCenteredStatBlock(
    ctx,
    'DISTANCE',
    stats.distStr,
    w / 2,
    centerY,
    colors,
    scale,
    Math.round(108 * scale)
  )

  // 2. Pace
  drawCenteredStatBlock(
    ctx,
    'PACE',
    stats.paceStr,
    w / 2,
    centerY + spacing,
    colors,
    scale,
    Math.round(108 * scale)
  )

  // 3. Time
  drawCenteredStatBlock(
    ctx,
    'TIME',
    stats.timeStr,
    w / 2,
    centerY + spacing * 2,
    colors,
    scale,
    Math.round(108 * scale)
  )

  // Footer Branding
  renderBrandFooter(ctx, colors, scale, w, h)
}

/**
 * Grid Layout (Matches Strava reference screenshot #2)
 * Clean 2x3 matrix with Distance, Pace, Calories, Time, Elev Gain, Max Elev.
 */
function renderGridLayout(
  ctx: CanvasRenderingContext2D,
  stats: {
    distStr: string
    paceStr: string
    timeStr: string
    elevGainStr: string
    maxElevStr: string
    caloriesStr: string
    titleStr: string
    dateStr: string
  },
  colors: ThemeColors,
  scale: number,
  w: number,
  h: number
) {
  setShadow(ctx, colors.shadow)

  // Header
  const topY = Math.round(h * 0.1)
  ctx.textAlign = 'center'
  ctx.fillStyle = colors.muted
  ctx.font = `600 ${Math.round(22 * scale)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText(stats.dateStr.toUpperCase(), w / 2, topY)

  ctx.fillStyle = colors.text
  ctx.font = `800 ${Math.round(40 * scale)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText(stats.titleStr, w / 2, topY + Math.round(50 * scale))

  // 2-Row x 3-Column Matrix
  const gridStartY = Math.round(h * 0.35)
  const col1X = w * 0.2
  const col2X = w * 0.5
  const col3X = w * 0.8
  const rowSpacing = Math.round(220 * scale)

  const labelSize = Math.round(22 * scale)
  const valueSize = Math.round(56 * scale)

  // Row 1
  drawCenteredStatBlock(
    ctx,
    'DISTANCE',
    stats.distStr,
    col1X,
    gridStartY,
    colors,
    scale,
    valueSize,
    labelSize
  )
  drawCenteredStatBlock(
    ctx,
    'PACE',
    stats.paceStr,
    col2X,
    gridStartY,
    colors,
    scale,
    valueSize,
    labelSize
  )
  drawCenteredStatBlock(
    ctx,
    'CALORIES',
    stats.caloriesStr,
    col3X,
    gridStartY,
    colors,
    scale,
    valueSize,
    labelSize
  )

  // Row 2
  drawCenteredStatBlock(
    ctx,
    'TIME',
    stats.timeStr,
    col1X,
    gridStartY + rowSpacing,
    colors,
    scale,
    valueSize,
    labelSize
  )
  drawCenteredStatBlock(
    ctx,
    'ELEV GAIN',
    stats.elevGainStr,
    col2X,
    gridStartY + rowSpacing,
    colors,
    scale,
    valueSize,
    labelSize
  )
  drawCenteredStatBlock(
    ctx,
    'MAX ELEV',
    stats.maxElevStr,
    col3X,
    gridStartY + rowSpacing,
    colors,
    scale,
    valueSize,
    labelSize
  )

  // Footer Branding
  renderBrandFooter(ctx, colors, scale, w, h)
}

/**
 * Bottom Badge Layout (Matches Strava reference screenshot #5)
 * Positions statistics neatly in the lower third.
 */
function renderBottomBadgeLayout(
  ctx: CanvasRenderingContext2D,
  stats: { distStr: string; paceStr: string; timeStr: string; titleStr: string; dateStr: string },
  colors: ThemeColors,
  scale: number,
  w: number,
  h: number
) {
  setShadow(ctx, colors.shadow)

  const badgeY = Math.round(h * 0.72)
  const col1X = w * 0.22
  const col2X = w * 0.5
  const col3X = w * 0.78
  const valSize = Math.round(64 * scale)
  const lblSize = Math.round(22 * scale)

  // 3 Columns: Distance, Pace, Time
  drawCenteredStatBlock(
    ctx,
    'DISTANCE',
    stats.distStr,
    col1X,
    badgeY,
    colors,
    scale,
    valSize,
    lblSize
  )
  drawCenteredStatBlock(ctx, 'PACE', stats.paceStr, col2X, badgeY, colors, scale, valSize, lblSize)
  drawCenteredStatBlock(ctx, 'TIME', stats.timeStr, col3X, badgeY, colors, scale, valSize, lblSize)

  // Footer Branding
  renderBrandFooter(ctx, colors, scale, w, h)
}

function drawCenteredStatBlock(
  ctx: CanvasRenderingContext2D,
  label: string,
  value: string,
  x: number,
  y: number,
  colors: ThemeColors,
  scale: number,
  valueFontSize = Math.round(100 * scale),
  labelFontSize = Math.round(24 * scale)
) {
  setShadow(ctx, colors.shadow)

  // Label
  ctx.textAlign = 'center'
  ctx.fillStyle = colors.muted
  ctx.font = `600 ${labelFontSize}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText(label, x, y)

  // Value
  ctx.fillStyle = colors.text
  ctx.font = `800 ${valueFontSize}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText(value, x, y + labelFontSize + Math.round(16 * scale) + valueFontSize * 0.75)
}

function renderBrandFooter(
  ctx: CanvasRenderingContext2D,
  colors: ThemeColors,
  scale: number,
  w: number,
  h: number
) {
  setShadow(ctx, colors.shadow)
  const footerY = h - Math.round(70 * scale)

  ctx.textAlign = 'center'
  ctx.fillStyle = colors.muted
  ctx.font = `800 ${Math.round(26 * scale)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText('VENTSTRIDE', w / 2, footerY)

  setShadow(ctx, false)
}
