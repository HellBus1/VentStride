import { AccentColor } from '@/types'

export const ACCENT_COLORS: AccentColor[] = [
  {
    id: 'gold',
    name: 'Gold',
    hex: '#DDB967',
    desc: 'Default warm gold'
  },
  {
    id: 'moss',
    name: 'Moss',
    hex: '#4A5D45',
    desc: 'Earthy trail green'
  },
  {
    id: 'slate-blue',
    name: 'Slate Blue',
    hex: '#6B8CA8',
    desc: 'Cool morning sky'
  },
  {
    id: 'rust',
    name: 'Rust',
    hex: '#C47A5A',
    desc: 'Warm desert sunset'
  },
  {
    id: 'chalk',
    name: 'Chalk',
    hex: '#E8E4D9',
    desc: 'Crisp minimal white'
  },
  {
    id: 'dusk-rose',
    name: 'Dusk Rose',
    hex: '#A86B7A',
    desc: 'Soft evening twilight'
  }
]

export const DEFAULT_ACCENT = ACCENT_COLORS[0].hex
