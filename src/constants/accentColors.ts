import { AccentColor } from '@/types'

export const ACCENT_COLORS: AccentColor[] = [
  { id: 'gold', name: 'Warm Gold', hex: '#F5C869' },
  { id: 'orange', name: 'Strava Orange', hex: '#FF6B35' },
  { id: 'moss', name: 'Bright Moss', hex: '#65C27B' },
  { id: 'slate-blue', name: 'Sky Blue', hex: '#6CB2EB' },
  { id: 'rust', name: 'Coral Rust', hex: '#FA8C68' },
  { id: 'chalk', name: 'Pure White', hex: '#FFFFFF' }
]

export const DEFAULT_ACCENT = ACCENT_COLORS[0].hex
