export type ThemeId =
  | 'imperial-gold'
  | 'midnight-scholar'
  | 'ivory-crimson'
  | 'emerald-institute'
  | 'cosmic-arc'
  | 'modern-slate'
  | 'retro-pop'
  | 'sunset-diploma'

export interface Theme {
  id: ThemeId
  name: string
  description: string
  previewBg: string
  previewBorder: string
  previewPrimary: string
  previewAccent: string
}

export const themes: Theme[] = [
  {
    id: 'imperial-gold',
    name: 'Imperial Gold',
    description: 'Classic ivory with ornate gold borders',
    previewBg: '#FAF7F0',
    previewBorder: '#B8860B',
    previewPrimary: '#B8860B',
    previewAccent: '#1B2A4A',
  },
  {
    id: 'midnight-scholar',
    name: 'Midnight Scholar',
    description: 'Dark prestige with silver and electric blue',
    previewBg: '#0F1923',
    previewBorder: '#8B9DB5',
    previewPrimary: '#C9D1D9',
    previewAccent: '#58A6FF',
  },
  {
    id: 'ivory-crimson',
    name: 'Ivory & Crimson',
    description: 'Traditional white with deep crimson authority',
    previewBg: '#FFFFFF',
    previewBorder: '#8B0000',
    previewPrimary: '#8B0000',
    previewAccent: '#2C2C2C',
  },
  {
    id: 'emerald-institute',
    name: 'Emerald Institute',
    description: 'Forest green with warm gold accents',
    previewBg: '#F8FFF8',
    previewBorder: '#1A5C38',
    previewPrimary: '#1A5C38',
    previewAccent: '#C9A84C',
  },
  {
    id: 'cosmic-arc',
    name: 'Cosmic Arc',
    description: 'Deep space violet with teal highlights',
    previewBg: '#121520',
    previewBorder: '#7C6FD6',
    previewPrimary: '#A8B4FF',
    previewAccent: '#5EEAD4',
  },
  {
    id: 'modern-slate',
    name: 'Modern Slate',
    description: 'Minimal light gray with crisp ink contrast',
    previewBg: '#F6F7F8',
    previewBorder: '#2D3748',
    previewPrimary: '#1A202C',
    previewAccent: '#3182CE',
  },
  {
    id: 'retro-pop',
    name: 'Retro Pop',
    description: 'Cream canvas with coral and mint energy',
    previewBg: '#FFFEF5',
    previewBorder: '#FF6B6B',
    previewPrimary: '#2D3436',
    previewAccent: '#00B894',
  },
  {
    id: 'sunset-diploma',
    name: 'Sunset Diploma',
    description: 'Warm paper with terracotta and sand tones',
    previewBg: '#FAF6F3',
    previewBorder: '#C67B5C',
    previewPrimary: '#6B4423',
    previewAccent: '#D4A574',
  },
]
