export type StatKey =
  | 'distance'
  | 'pace'
  | 'movingTime'
  | 'elevationGain'
  | 'calories'
  | 'maxElevation'

export type ActivityType = 'Run' | 'Trail Run' | 'Ride' | 'Hike' | 'Walk'

export interface ActivityInput {
  title: string
  date: string
  distanceKm: number
  movingTimeSec: number
  elevationGain?: number
  calories?: number
  maxElevation?: number
  activityType?: ActivityType
}

export type LayoutPreset = 'essential' | 'detailed'

export interface AccentColor {
  id: string
  name: string
  hex: string
  desc: string
}

export interface CardConfig {
  layoutPreset: LayoutPreset
  visibleStats: StatKey[]
  accentColor: string
}
