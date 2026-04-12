'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { ThemeId } from '@/lib/themes'
import type { VariantId } from '@/lib/textVariants'
import { buildExportHref } from '@/lib/buildExportHref'
import {
  certificateDownloadFilename,
  rasterizeCertificate,
  triggerDownload,
} from '@/lib/captureCertificate'
import { cn } from '@/lib/utils'

interface Props {
  recipientName: string
  achievement: string
  selectedTheme: ThemeId
  selectedVariant: VariantId
  dateAwarded: string
  disabled: boolean
  /** Hidden export-layout certificate node to rasterize (same props as preview). */
  captureElementId?: string
  /** When false, only PNG (e.g. public /view page). */
  showPrintLink?: boolean
  /** Hide helper line under buttons */
  showHelperText?: boolean
}

const btnPrimary =
  'flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 font-semibold text-[#0d1117] hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50'
const btnSecondary =
  'flex w-full items-center justify-center rounded-lg border border-white/20 py-2.5 text-white/60 hover:bg-white/5'

export default function DownloadButton({
  recipientName,
  achievement,
  selectedTheme,
  selectedVariant,
  dateAwarded,
  disabled,
  captureElementId = 'certificate-share',
  showPrintLink = true,
  showHelperText = true,
}: Props) {
  const [pngLoading, setPngLoading] = useState(false)

  const base = {
    name: recipientName,
    certified: achievement,
    theme: selectedTheme,
    variant: selectedVariant,
    dateAwarded,
  }

  const hrefPrint = buildExportHref({ ...base, autoDownload: false })

  async function handleDownloadPng() {
    if (pngLoading) return
    const el = document.getElementById(captureElementId)
    if (!el) {
      console.error('[Download] Missing certificate node:', captureElementId)
      return
    }
    setPngLoading(true)
    try {
      const dataUrl = await rasterizeCertificate(el, 3)
      triggerDownload(dataUrl, certificateDownloadFilename(recipientName))
    } catch (err) {
      console.error('[Download] PNG failed:', err)
    } finally {
      setPngLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {disabled ? (
        <span
          className={cn(btnPrimary, 'cursor-not-allowed opacity-40')}
          aria-disabled
        >
          Download as PNG
        </span>
      ) : (
        <button
          type="button"
          disabled={pngLoading}
          onClick={handleDownloadPng}
          className={btnPrimary}
        >
          {pngLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Preparing PNG…
            </>
          ) : (
            'Download as PNG'
          )}
        </button>
      )}
      {showPrintLink &&
        (disabled ? (
          <span
            className={cn(btnSecondary, 'cursor-not-allowed opacity-40')}
            aria-disabled
          >
            Open print page
          </span>
        ) : (
          <a
            href={hrefPrint}
            target="_blank"
            rel="noopener noreferrer"
            className={btnSecondary}
          >
            Open print page
          </a>
        ))}
      {showHelperText && (
        <p className="text-center text-[10px] leading-snug text-white/35">
          PNG saves in place from the same layout as the preview. Print still opens
          the export page if you need a PDF.
        </p>
      )}
    </div>
  )
}
