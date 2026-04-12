'use client'

import { Separator } from '@/components/ui/separator'
import type { UseCertificateReturn } from '@/hooks/useCertificate'
import { themes } from '@/lib/themes'
import { textVariants } from '@/lib/textVariants'
import ThemeSelector from '@/components/ThemeSelector'
import TextVariantSelector from '@/components/TextVariantSelector'
import CertificatePreview from '@/components/CertificatePreview'
import DownloadButton from '@/components/DownloadButton'

interface Props {
  cert: UseCertificateReturn
}

export default function CertificateStudio({ cert }: Props) {
  const nameLine = `${cert.recipientName.trim() || 'Your Name Here'} · ${cert.achievement.trim() || 'Outstanding Nothingness'}`

  return (
    <div className="animate-studio-enter flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row">
      <div
        className="pointer-events-none fixed top-0 left-[-9999px] z-0 w-[1000px] shrink-0"
        aria-hidden
      >
        <CertificatePreview
          recipientName={cert.recipientName}
          achievement={cert.achievement}
          selectedTheme={cert.selectedTheme}
          selectedVariant={cert.selectedVariant}
          dateAwarded={cert.dateAwarded}
          instanceId="certificate-share"
          layout="export"
        />
      </div>
      <aside className="surface-panel flex w-full flex-col gap-6 overflow-y-auto border-b border-white/[0.09] p-6 lg:w-[380px] lg:min-w-[380px] lg:border-r lg:border-b-0">
        <p className="text-[11px] leading-relaxed text-app-muted">
          <span className="text-app-secondary">Editing</span> {nameLine}
        </p>
        <ThemeSelector
          themes={themes}
          selectedTheme={cert.selectedTheme}
          onSelect={cert.setSelectedTheme}
        />
        <Separator className="bg-white/[0.08]" />
        <TextVariantSelector
          variants={textVariants}
          selectedVariant={cert.selectedVariant}
          onSelect={cert.setSelectedVariant}
        />
        <Separator className="bg-white/[0.08]" />
        <div className="sticky bottom-4 z-10 space-y-3 rounded-xl border border-white/[0.06] bg-[#0a0c10]/80 p-3 pb-2 backdrop-blur-md lg:static lg:border-0 lg:bg-transparent lg:p-0">
          <DownloadButton
            recipientName={cert.recipientName}
            achievement={cert.achievement}
            selectedTheme={cert.selectedTheme}
            selectedVariant={cert.selectedVariant}
            dateAwarded={cert.dateAwarded}
            disabled={false}
          />
          <button
            type="button"
            onClick={() => cert.setIsShareModalOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] py-2.5 text-sm text-app transition hover:border-white/[0.18] hover:bg-white/[0.07]"
          >
            Share Certificate
          </button>
        </div>
      </aside>
      <section className="flex min-h-0 min-w-0 flex-1 items-start justify-center overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:items-center lg:p-10">
        <div className="w-full min-w-0 max-w-4xl">
          <CertificatePreview
            recipientName={cert.recipientName}
            achievement={cert.achievement}
            selectedTheme={cert.selectedTheme}
            selectedVariant={cert.selectedVariant}
            dateAwarded={cert.dateAwarded}
          />
        </div>
      </section>
    </div>
  )
}
