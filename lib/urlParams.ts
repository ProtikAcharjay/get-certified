import type { ThemeId } from '@/lib/themes'
import { themes } from '@/lib/themes'
import type { VariantId } from '@/lib/textVariants'
import { textVariants } from '@/lib/textVariants'

const themeIds = new Set<ThemeId>(themes.map((t) => t.id))
const variantIds = new Set<VariantId>(textVariants.map((v) => v.id))

export function parseThemeId(value: string | null): ThemeId {
  if (value && themeIds.has(value as ThemeId)) return value as ThemeId
  return 'imperial-gold'
}

export function parseVariantId(value: string | null): VariantId {
  if (value && variantIds.has(value as VariantId)) return value as VariantId
  return 'classical'
}
