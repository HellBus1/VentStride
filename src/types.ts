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

export type CardRatio = '9:16' | '3:4'

export type CardOrientation = 'vertical' | 'horizontal'

export type CardTheme = 'overlay' | 'classic' | 'clean'

export type CardDesign = 'stacked' | 'grid' | 'bottom-badge'

export interface AccentColor {
  id: string
  name: string
  hex: string
}

export interface CardConfig {
  accentColor: string
  ratio: CardRatio
  orientation: CardOrientation
  theme: CardTheme
  design: CardDesign
}

export const RATIO_DIMENSIONS = {
  '9:16': {
    vertical: { w: 1080, h: 1920 },
    horizontal: { w: 1920, h: 1080 }
  },
  '3:4': {
    vertical: { w: 810, h: 1080 },
    horizontal: { w: 1080, h: 810 }
  }
} as const
