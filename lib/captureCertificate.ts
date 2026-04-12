/**
 * Certificate capture via html-to-image (SVG foreignObject).
 *
 * - Theme background uses canonical hex from themes.ts (avoids lab/oklch in canvas fills).
 * - Resolved --cert-* / --font-* values are inlined on the root so every theme matches preview.
 * - SVG id collisions across multiple certs are fixed in CertificatePreview (useId).
 */

import { toPng, getFontEmbedCSS } from 'html-to-image'
import type { ThemeId } from '@/lib/themes'
import { themes } from '@/lib/themes'

const VARS_TO_INLINE = [
  '--cert-bg',
  '--cert-border',
  '--cert-border-2',
  '--cert-primary',
  '--cert-accent',
  '--cert-text',
  '--cert-body-text',
  '--cert-muted',
  '--cert-heading-font',
  '--cert-body-font',
  '--font-cormorant',
  '--font-playfair',
  '--font-eb-garamond',
  '--font-libre-baskerville',
  '--font-dm-sans',
  '--font-dancing',
  '--font-great-vibes',
  '--font-pinyon',
] as const

function themeExportBackground(dataTheme: string | null): string {
  const t = themes.find((x) => x.id === (dataTheme as ThemeId))
  return t?.previewBg ?? '#faf7f0'
}

function readResolvedVars(el: HTMLElement): Array<[string, string]> {
  const elCs = getComputedStyle(el)
  const htmlCs = getComputedStyle(document.documentElement)
  const pairs: Array<[string, string]> = []
  for (const v of VARS_TO_INLINE) {
    const val =
      elCs.getPropertyValue(v).trim() || htmlCs.getPropertyValue(v).trim()
    if (val) pairs.push([v, val])
  }
  return pairs
}

/** Wait until the node has real layout (avoids blank PNGs if capture runs too early). */
async function waitForElementPainted(el: HTMLElement): Promise<void> {
  for (let i = 0; i < 60; i++) {
    const r = el.getBoundingClientRect()
    if (r.width >= 80 && r.height >= 80) {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      })
      return
    }
    await new Promise((r) => setTimeout(r, 32))
  }
}

export async function rasterizeCertificate(
  element: HTMLElement,
  scale: number,
): Promise<string> {
  if (typeof document === 'undefined') {
    throw new Error('rasterizeCertificate requires a browser environment')
  }

  if (document.fonts?.ready) {
    await document.fonts.ready
  }

  const dataTheme = element.getAttribute('data-theme')
  const bgHex = themeExportBackground(dataTheme)

  const varPairs = readResolvedVars(element)
  const styleBackup: Array<[string, string]> = []
  for (const [k, v] of varPairs) {
    styleBackup.push([k, element.style.getPropertyValue(k)])
    element.style.setProperty(k, v)   
  }

  const prevBgColor = element.style.backgroundColor
  element.style.backgroundColor = bgHex

  let fontEmbedCSS: string | undefined
  try {
    fontEmbedCSS = await getFontEmbedCSS(element)
  } catch {
    fontEmbedCSS = undefined
  }

  await waitForElementPainted(element)

  const rect = element.getBoundingClientRect()
  const w = Math.max(1, Math.round(rect.width))
  const h = Math.max(1, Math.round(rect.height))

  const saved = {
    width: element.style.width,
    height: element.style.height,
    maxHeight: element.style.maxHeight,
    overflow: element.style.overflow,
  }

  element.style.width = `${w}px`
  element.style.height = `${h}px`
  element.style.maxHeight = `${h}px`
  element.style.overflow = 'hidden'

  const opts = {
    width: w,
    height: h,
    pixelRatio: scale,
    backgroundColor: bgHex,
    cacheBust: true,
    fontEmbedCSS: fontEmbedCSS || undefined,
    filter: (node: HTMLElement) => {
      if (node.tagName === 'NOSCRIPT') return false
      return true
    },
  }

  try {
    try {
      return await toPng(element, opts)
    } catch {
      await new Promise((r) => setTimeout(r, 120))
      return await toPng(element, opts)
    }
  } finally {
    element.style.width = saved.width
    element.style.height = saved.height
    element.style.maxHeight = saved.maxHeight
    element.style.overflow = saved.overflow
    if (prevBgColor) element.style.backgroundColor = prevBgColor
    else element.style.removeProperty('background-color')
    for (const [k, old] of styleBackup) {
      if (old) element.style.setProperty(k, old)
      else element.style.removeProperty(k)
    }
  }
}

export function triggerDownload(dataUrl: string, filename: string) {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  setTimeout(() => document.body.removeChild(link), 500)
}

/** Safe filename stem for certificate PNG downloads */
export function certificateDownloadFilename(recipientName: string) {
  const slug =
    recipientName
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 80) || 'certificate'
  return `certifypromax-${slug}.png`
}
