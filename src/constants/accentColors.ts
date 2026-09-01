import { AccentColor } from '@/types'

export const ACCENT_COLORS: AccentColor[] = [
  { id: 'gold', name: 'Gold', hex: '#DDB967' },
  { id: 'moss', name: 'Moss', hex: '#4A5D45' },
  { id: 'slate-blue', name: 'Slate Blue', hex: '#6B8CA8' },
  { id: 'rust', name: 'Rust', hex: '#C47A5A' },
  { id: 'chalk', name: 'Chalk', hex: '#E8E4D9' },
  { id: 'dusk-rose', name: 'Dusk Rose', hex: '#A86B7A' }
]

export const DEFAULT_ACCENT = ACCENT_COLORS[0].hex
