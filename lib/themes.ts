export type ThemeId =
  | 'imperial-gold'
  | 'midnight-scholar'
  | 'ivory-crimson'
  | 'emerald-institute'

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
]
