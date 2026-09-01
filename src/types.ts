export type StatKey =
  | 'distance'
  | 'pace'
  | 'movingTime'
  | 'elevationGain'
  | 'calories'
  | 'maxElevation'

export interface ActivityInput {
  title: string
  date: string
  distanceKm: number
  movingTimeSec: number
  elevationGain?: number
  calories?: number
  maxElevation?: number
}

export type LayoutPreset = 'essential' | 'detailed'

export type CardRatio = '9:16' | '3:4' | '1:1' | '16:9' | 'custom'

export type CardTheme = 'overlay' | 'classic' | 'clean'

export type CardDesign = 'stacked' | 'grid' | 'bottom-badge'

export interface AccentColor {
  id: string
  name: string
  hex: string
}

export interface CardConfig {
  layoutPreset: LayoutPreset
  visibleStats: StatKey[]
  accentColor: string
  ratio: CardRatio
  theme: CardTheme
  design: CardDesign
  customWidth: number
  customHeight: number
  lockAspectRatio: boolean
}

export const RATIO_DIMENSIONS: Record<Exclude<CardRatio, 'custom'>, { w: number; h: number }> = {
  '9:16': { w: 1080, h: 1920 },
  '3:4': { w: 1080, h: 1440 },
  '1:1': { w: 1080, h: 1080 },
  '16:9': { w: 1920, h: 1080 }
}
