'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import CertificatePreview from '@/components/CertificatePreview'
import { parseThemeId, parseVariantId } from '@/lib/urlParams'
import {
  certificateDownloadFilename,
  rasterizeCertificate,
  triggerDownload,
} from '@/lib/captureCertificate'

export default function ExportClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [pngLoading, setPngLoading] = useState(false)
  const [autoDownloadDone, setAutoDownloadDone] = useState(false)

  const name = searchParams.get('name') ?? ''
  const certified = searchParams.get('certified') ?? ''
  const theme = parseThemeId(searchParams.get('theme'))
  const variant = parseVariantId(searchParams.get('variant'))
  /** Stable dependency — `searchParams` object identity can change every render. */
  const searchParamsKey = searchParams.toString()
  const dateAwarded =
    searchParams.get('date')?.trim() ||
    new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  const studioHref = `/?${new URLSearchParams({
    name,
    certified,
    theme,
    variant,
  }).toString()}`

  async function runDownload() {
    const el = document.getElementById('certificate-export')
    if (!el) return
    setPngLoading(true)
    try {
      const dataUrl = await rasterizeCertificate(el, 3)
      triggerDownload(dataUrl, certificateDownloadFilename(name))
    } catch (err) {
      console.error('[Export] PNG generation failed:', err)
    } finally {
      setPngLoading(false)
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParamsKey)
    if (params.get('download') !== '1') return

    let cancelled = false
    ;(async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready
      }
      await new Promise<void>((r) => {
        requestAnimationFrame(() => requestAnimationFrame(() => r()))
      })
      const el = document.getElementById('certificate-export')
      if (!el || cancelled) return
      try {
        const dataUrl = await rasterizeCertificate(el, 3)
        if (cancelled) return
        triggerDownload(dataUrl, certificateDownloadFilename(name))
        setAutoDownloadDone(true)
        const p = new URLSearchParams(searchParamsKey)
        p.delete('download')
        const qs = p.toString()
        router.replace(qs ? `/export?${qs}` : '/export')
      } catch (err) {
        console.error('[Export] Auto-download failed:', err)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [searchParamsKey, router, name])

  return (
    <div className="flex min-h-screen flex-col text-app">
      <header className="shrink-0 border-b border-white/[0.09] bg-[#090b0f]/80 px-4 py-5 backdrop-blur-sm sm:px-6">
        <p className="text-[10px] font-medium tracking-[0.2em] text-app-muted uppercase">
          Certify Pro Max — export
        </p>
        <h1 className="mt-1 text-base font-semibold tracking-tight text-app">
          Certificate download
        </h1>
        <p className="mt-1 text-xs text-app-secondary">
          Fixed layout (1000px wide). Use the buttons below if the file did not
          save automatically.
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 py-8">
        <div className="w-full overflow-x-auto">
          <div className="mx-auto flex w-[1000px] max-w-none justify-center">
            <CertificatePreview
              recipientName={name}
              achievement={certified}
              selectedTheme={theme}
              selectedVariant={variant}
              dateAwarded={dateAwarded}
              instanceId="certificate-export"
              layout="export"
            />
          </div>
        </div>

        <div className="mt-8 flex w-full max-w-md flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            disabled={pngLoading}
            onClick={runDownload}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#e8eaed] py-2.5 font-semibold text-[#0a0c10] shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pngLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating…
              </>
            ) : (
              'Download PNG again'
            )}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex-1 rounded-lg border border-white/[0.12] py-2.5 text-app-secondary transition hover:border-white/[0.18] hover:bg-white/[0.05] hover:text-app"
          >
            Print / Save as PDF
          </button>
        </div>

        {searchParams.get('download') === '1' && autoDownloadDone && (
          <p className="mt-4 text-center text-xs text-emerald-400/95">
            Download should have started. You can close this tab or use the
            buttons above.
          </p>
        )}

        <Link
          href={studioHref}
          className="mt-6 text-sm text-app-muted underline decoration-white/15 underline-offset-4 transition hover:text-app-secondary"
        >
          ← Back to studio
        </Link>
      </main>
    </div>
  )
}
