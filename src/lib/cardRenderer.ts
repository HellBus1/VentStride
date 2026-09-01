/**
 * Canvas Card Rendering Engine
 * Optimized for Instagram Story & Social Media.
 * Implements refined typographic hierarchy (values large, units 50-60% size),
 * strictly bounded column widths, and vertically balanced negative space.
 */
import { ActivityInput, CardConfig, RATIO_DIMENSIONS } from '@/types'
import { calcPace, formatDistance, formatTime, formatDate } from '@/lib/formatters'

export async function ensureFontsLoaded(): Promise<void> {
  if (document.fonts) {
    try {
      await document.fonts.load('500 24px "Plus Jakarta Sans"')
      await document.fonts.load('600 32px "Plus Jakarta Sans"')
      await document.fonts.load('700 48px "Plus Jakarta Sans"')
      await document.fonts.load('800 96px "Plus Jakarta Sans"')
      await document.fonts.ready
    } catch {
      // ignore
    }
  }
}

export function getCardDimensions(config: CardConfig): { w: number; h: number } {
  const ratio = config.ratio || '9:16'
  const dims = RATIO_DIMENSIONS[ratio] || RATIO_DIMENSIONS['9:16']

  // Stacked hero is strictly vertical only
  if (config.design === 'stacked') {
    return dims.vertical
  }

  // Grid is strictly horizontal only
  if (config.design === 'grid') {
    return dims.horizontal
  }

  // Bottom overlay supports both
  const orientation = config.orientation === 'horizontal' ? 'horizontal' : 'vertical'
  return dims[orientation]
}

interface ThemeColors {
  bg: string | null
  text: string
  muted: string
  accent: string
  border: string
  shadow: boolean
}

function getThemeColors(theme: CardConfig['theme'], accent: string): ThemeColors {
  const chosenAccent = accent || '#F5C869'
  switch (theme) {
    case 'overlay':
      return {
        bg: null,
        text: '#FFFFFF',
        muted: 'rgba(255, 255, 255, 0.85)',
        accent: chosenAccent,
        border: 'rgba(255, 255, 255, 0.25)',
        shadow: true
      }
    case 'classic':
      return {
        bg: '#10140F',
        text: '#F5F5F0',
        muted: '#8A9986',
        accent: chosenAccent,
        border: '#2A3828',
        shadow: false
      }
    case 'clean':
      return {
        bg: '#FFFFFF',
        text: '#111111',
        muted: '#737373',
        accent: chosenAccent,
        border: '#E5E5E5',
        shadow: false
      }
  }
}

function setShadow(ctx: CanvasRenderingContext2D, enable: boolean) {
  if (enable) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.75)'
    ctx.shadowBlur = 14
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 3
  } else {
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
  }
}

interface MetricItem {
  id: string
  label: string
  num: string
  unit: string
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
  const distNum = formatDistance(activity.distanceKm)
  const timeStr = formatTime(activity.movingTimeSec)
  const dateStr = formatDate(activity.date) || 'TODAY'
  const titleStr = activity.title?.trim() || 'Morning Run'

  // Primary 3 Metrics
  const primaryStats: MetricItem[] = [
    { id: 'distance', label: 'Distance', num: distNum, unit: 'km' },
    { id: 'pace', label: 'Pace', num: pace.formatted, unit: '/km' },
    { id: 'time', label: 'Time', num: timeStr, unit: '' }
  ]

  // Optional metrics (for Grid Matrix)
  const optionalStats: MetricItem[] = []
  if (config.design === 'grid') {
    if (activity.calories !== undefined && activity.calories > 0) {
      optionalStats.push({
        id: 'calories',
        label: 'Calories',
        num: activity.calories.toLocaleString(),
        unit: 'Cal'
      })
    }
    if (activity.elevationGain !== undefined && activity.elevationGain > 0) {
      optionalStats.push({
        id: 'elevGain',
        label: 'Elev Gain',
        num: `${activity.elevationGain}`,
        unit: 'm'
      })
    }
    if (activity.maxElevation !== undefined && activity.maxElevation > 0) {
      optionalStats.push({
        id: 'maxElev',
        label: 'Max Elev',
        num: `${activity.maxElevation}`,
        unit: 'm'
      })
    }
  }

  const scale = w / 1080

  // 1. Clear background
  ctx.clearRect(0, 0, w, h)

  if (colors.bg) {
    ctx.fillStyle = colors.bg
    ctx.fillRect(0, 0, w, h)

    if (config.theme === 'classic') {
      ctx.strokeStyle = colors.border
      ctx.lineWidth = Math.max(1, Math.round(2 * scale))
      const margin = Math.round(32 * scale)
      ctx.strokeRect(margin, margin, w - margin * 2, h - margin * 2)
    }
  }

  // 2. Render selected design
  if (config.design === 'grid') {
    renderGridLayout(
      ctx,
      { titleStr, dateStr, allStats: [...primaryStats, ...optionalStats] },
      colors,
      scale,
      w,
      h
    )
  } else if (config.design === 'bottom-badge') {
    renderBottomBadgeLayout(ctx, { titleStr, dateStr, primaryStats }, colors, scale, w, h)
  } else {
    // Default: 'stacked' hero layout (Vertical only)
    renderStackedHeroLayout(ctx, { titleStr, dateStr, primaryStats }, colors, scale, w, h)
  }
}

/**
 * 1. Stacked Hero Layout (Vertical Only, 1080x1920 or 810x1080)
 * Clean, breathable vertical layout with generous line-heights and large bold values.
 */
function renderStackedHeroLayout(
  ctx: CanvasRenderingContext2D,
  data: {
    titleStr: string
    dateStr: string
    primaryStats: MetricItem[]
  },
  colors: ThemeColors,
  scale: number,
  w: number,
  h: number
) {
  setShadow(ctx, colors.shadow)

  // Header: Date & Activity Title
  const headerY = Math.round(h * 0.08)

  ctx.textAlign = 'center'
  ctx.fillStyle = colors.accent
  ctx.font = `700 ${Math.round(20 * scale)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText(data.dateStr.toUpperCase(), w / 2, headerY)

  ctx.fillStyle = colors.text
  ctx.font = `800 ${Math.round(34 * scale)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText(data.titleStr, w / 2, headerY + Math.round(44 * scale))

  // 3 Vertically Centered Stats with generous spacing
  const startY = h * 0.24
  const endY = h * 0.82
  const availableHeight = endY - startY
  const itemGap = availableHeight / 3

  const labelFontSize = Math.round(24 * scale)
  const valueFontSize = Math.round(108 * scale)

  data.primaryStats.forEach((stat, i) => {
    const centerY = startY + i * itemGap + itemGap * 0.5

    // Gold / Accent Label (with extra 6px breathing room)
    ctx.textAlign = 'center'
    ctx.fillStyle = colors.accent
    ctx.font = `700 ${labelFontSize}px "Plus Jakarta Sans", sans-serif`
    ctx.fillText(stat.label, w / 2, centerY - valueFontSize * 0.42)

    // Huge bold value + 55% de-emphasized unit
    drawValueWithUnit(
      ctx,
      stat.num,
      stat.unit,
      w / 2,
      centerY + valueFontSize * 0.4,
      valueFontSize,
      colors,
      scale,
      w * 0.85
    )
  })

  // Footer Branding
  renderBrandFooter(ctx, colors, scale, w, h)
}

/**
 * 2. Grid Matrix Layout (Horizontal Only, 1920x1080 or 1080x810)
 * Vertically centered in the frame to eliminate top-heavy dead space.
 * Fixed column bounding boxes prevent horizontal collisions.
 */
function renderGridLayout(
  ctx: CanvasRenderingContext2D,
  data: {
    titleStr: string
    dateStr: string
    allStats: MetricItem[]
  },
  colors: ThemeColors,
  scale: number,
  w: number,
  h: number
) {
  setShadow(ctx, colors.shadow)

  // Vertically center the entire content block
  const totalStats = data.allStats.length
  const cols = 3
  const rows = Math.ceil(totalStats / cols)

  const labelFontSize = Math.round(18 * scale)
  const valueFontSize = Math.round(52 * scale)
  const rowHeight = Math.round(150 * scale)
  const gridHeight = rows * rowHeight
  const headerBlockH = Math.round(100 * scale)
  const totalBlockH = headerBlockH + gridHeight

  // Block top starts so whole group is centered
  const blockTopY = Math.max(Math.round(40 * scale), (h - totalBlockH) / 2 - Math.round(15 * scale))

  // Header: Date & Title
  ctx.textAlign = 'center'
  ctx.fillStyle = colors.accent
  ctx.font = `700 ${Math.round(18 * scale)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText(data.dateStr.toUpperCase(), w / 2, blockTopY + Math.round(20 * scale))

  ctx.fillStyle = colors.text
  ctx.font = `800 ${Math.round(32 * scale)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText(data.titleStr, w / 2, blockTopY + Math.round(58 * scale))

  // 3 Distinct Columns with explicit horizontal padding
  const paddingX = Math.round(60 * scale)
  const availableW = w - paddingX * 2
  const colW = availableW / cols
  const maxMetricW = colW * 0.88 // Strict column width constraint to avoid collisions

  const gridStartY = blockTopY + headerBlockH + Math.round(20 * scale)

  data.allStats.forEach((stat, idx) => {
    const r = Math.floor(idx / cols)
    const c = idx % cols
    const colCenterX = paddingX + colW * c + colW * 0.5
    const cellCenterY = gridStartY + r * rowHeight + rowHeight * 0.5

    // Gold Label centered in column
    ctx.textAlign = 'center'
    ctx.fillStyle = colors.accent
    ctx.font = `700 ${labelFontSize}px "Plus Jakarta Sans", sans-serif`
    ctx.fillText(stat.label, colCenterX, cellCenterY - valueFontSize * 0.4)

    // Number + Unit centered in column
    drawValueWithUnit(
      ctx,
      stat.num,
      stat.unit,
      colCenterX,
      cellCenterY + valueFontSize * 0.42,
      valueFontSize,
      colors,
      scale,
      maxMetricW
    )
  })

  // Footer Branding
  renderBrandFooter(ctx, colors, scale, w, h)
}

/**
 * 3. Bottom Badge Layout (Supports Both Vertical and Horizontal)
 * Clustered in the lower section with strict column bounds and de-emphasized units.
 */
function renderBottomBadgeLayout(
  ctx: CanvasRenderingContext2D,
  data: {
    titleStr: string
    dateStr: string
    primaryStats: MetricItem[]
  },
  colors: ThemeColors,
  scale: number,
  w: number,
  h: number
) {
  setShadow(ctx, colors.shadow)

  const isLandscape = w > h
  const bottomSectionTop = isLandscape ? h * 0.52 : h * 0.66

  // Title / Date Header
  ctx.textAlign = 'center'
  ctx.fillStyle = colors.accent
  ctx.font = `700 ${Math.round(18 * scale)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText(data.dateStr.toUpperCase(), w / 2, bottomSectionTop)

  ctx.fillStyle = colors.text
  ctx.font = `800 ${Math.round(28 * scale)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText(data.titleStr, w / 2, bottomSectionTop + Math.round(36 * scale))

  // 3 Columns with strict bounds
  const paddingX = Math.round(40 * scale)
  const availableW = w - paddingX * 2
  const colW = availableW / 3
  const maxMetricW = colW * 0.88
  const statsCenterY = bottomSectionTop + Math.round(105 * scale)
  const valSize = Math.round(52 * scale)
  const lblSize = Math.round(18 * scale)

  data.primaryStats.forEach((stat, i) => {
    const colCenterX = paddingX + colW * i + colW * 0.5

    // Label
    ctx.textAlign = 'center'
    ctx.fillStyle = colors.accent
    ctx.font = `700 ${lblSize}px "Plus Jakarta Sans", sans-serif`
    ctx.fillText(stat.label, colCenterX, statsCenterY - valSize * 0.4)

    // Value + Unit
    drawValueWithUnit(
      ctx,
      stat.num,
      stat.unit,
      colCenterX,
      statsCenterY + valSize * 0.42,
      valSize,
      colors,
      scale,
      maxMetricW
    )
  })

  // Footer Branding
  renderBrandFooter(ctx, colors, scale, w, h)
}

/**
 * Draws a numeric value with a de-emphasized (55% size, regular weight) unit beside it.
 * Automatically downscales if the combined width exceeds maxAllowedWidth to prevent column overlap.
 */
function drawValueWithUnit(
  ctx: CanvasRenderingContext2D,
  numStr: string,
  unitStr: string,
  centerX: number,
  baselineY: number,
  baseFontSize: number,
  colors: ThemeColors,
  scale: number,
  maxAllowedWidth: number
) {
  let fontSize = baseFontSize

  // Measure and ensure fit within column
  const unitRatio = 0.55
  let unitFontSize = Math.round(fontSize * unitRatio)

  ctx.font = `800 ${fontSize}px "Plus Jakarta Sans", sans-serif`
  let numWidth = ctx.measureText(numStr).width
  ctx.font = `600 ${unitFontSize}px "Plus Jakarta Sans", sans-serif`
  let unitWidth = unitStr ? ctx.measureText(unitStr).width + Math.round(6 * scale) : 0
  let totalW = numWidth + unitWidth

  // Downscale if wider than column slot
  if (totalW > maxAllowedWidth && totalW > 0) {
    const shrinkFactor = maxAllowedWidth / totalW
    fontSize = Math.max(20, Math.floor(fontSize * shrinkFactor))
    unitFontSize = Math.round(fontSize * unitRatio)

    ctx.font = `800 ${fontSize}px "Plus Jakarta Sans", sans-serif`
    numWidth = ctx.measureText(numStr).width
    ctx.font = `600 ${unitFontSize}px "Plus Jakarta Sans", sans-serif`
    unitWidth = unitStr ? ctx.measureText(unitStr).width + Math.round(6 * scale) : 0
    totalW = numWidth + unitWidth
  }

  // Draw centered as a single combined block
  const startX = centerX - totalW / 2

  // 1. Draw Number (Bold 800)
  ctx.textAlign = 'left'
  ctx.fillStyle = colors.text
  ctx.font = `800 ${fontSize}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText(numStr, startX, baselineY)

  // 2. Draw Unit (De-emphasized 55% size, semibold 600, muted/accent tint)
  if (unitStr) {
    const gap = Math.round(6 * scale)
    ctx.fillStyle = colors.muted
    ctx.font = `600 ${unitFontSize}px "Plus Jakarta Sans", sans-serif`
    // Shift unit baseline slightly up for optical alignment
    ctx.fillText(unitStr, startX + numWidth + gap, baselineY - fontSize * 0.04)
  }
}

function renderBrandFooter(
  ctx: CanvasRenderingContext2D,
  colors: ThemeColors,
  scale: number,
  w: number,
  h: number
) {
  setShadow(ctx, colors.shadow)
  const footerY = h - Math.round(44 * scale)

  ctx.textAlign = 'center'
  ctx.fillStyle = colors.muted
  ctx.font = `800 ${Math.round(22 * scale)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText('VENTSTRIDE', w / 2, footerY)

  setShadow(ctx, false)
}
