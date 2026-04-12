import type { ThemeId } from '@/lib/themes'
import type { VariantId } from '@/lib/textVariants'

export interface ExportLinkOptions {
  name: string
  certified: string
  theme: ThemeId
  variant: VariantId
  dateAwarded: string
  /** When true, the export page triggers PNG download once after fonts load */
  autoDownload?: boolean
}

export function buildExportSearchParams(opts: ExportLinkOptions): URLSearchParams {
  const p = new URLSearchParams()
  if (opts.name.trim()) p.set('name', opts.name.trim())
  if (opts.certified.trim()) p.set('certified', opts.certified.trim())
  p.set('theme', opts.theme)
  p.set('variant', opts.variant)
  if (opts.dateAwarded.trim()) p.set('date', opts.dateAwarded.trim())
  if (opts.autoDownload) p.set('download', '1')
  return p
}

export function buildExportHref(opts: ExportLinkOptions): string {
  return `/export?${buildExportSearchParams(opts).toString()}`
}
