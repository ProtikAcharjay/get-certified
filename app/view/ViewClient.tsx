'use client'

import { useSearchParams } from 'next/navigation'
import CertificatePreview from '@/components/CertificatePreview'
import DownloadButton from '@/components/DownloadButton'
import { parseThemeId, parseVariantId } from '@/lib/urlParams'

export default function ViewClient() {
  const searchParams = useSearchParams()

  const recipientName = searchParams.get('name') ?? ''
  const achievement = searchParams.get('certified') ?? ''
  const selectedTheme = parseThemeId(searchParams.get('theme'))
  const selectedVariant = parseVariantId(searchParams.get('variant'))
  const dateAwarded =
    searchParams.get('date')?.trim() ||
    new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <div className="flex min-h-screen flex-col bg-[#0d1117]">
      <div
        className="pointer-events-none fixed top-0 left-[-9999px] z-0 w-[1000px] shrink-0"
        aria-hidden
      >
        <CertificatePreview
          recipientName={recipientName}
          achievement={achievement}
          selectedTheme={selectedTheme}
          selectedVariant={selectedVariant}
          dateAwarded={dateAwarded}
          instanceId="certificate-share"
          layout="export"
        />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full min-w-0 max-w-4xl">
          <CertificatePreview
            recipientName={recipientName}
            achievement={achievement}
            selectedTheme={selectedTheme}
            selectedVariant={selectedVariant}
            dateAwarded={dateAwarded}
            instanceId="certificate-view-preview"
            layout="studio"
          />
        </div>

        <div className="mt-10 w-full max-w-sm">
          <DownloadButton
            recipientName={recipientName}
            achievement={achievement}
            selectedTheme={selectedTheme}
            selectedVariant={selectedVariant}
            dateAwarded={dateAwarded}
            disabled={false}
            captureElementId="certificate-share"
            showPrintLink={false}
            showHelperText={false}
          />
        </div>
      </main>
    </div>
  )
}
