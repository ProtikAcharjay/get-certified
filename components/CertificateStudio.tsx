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
      <aside className="flex w-full flex-col gap-6 overflow-y-auto border-white/10 bg-[#161b22] p-6 lg:w-[380px] lg:min-w-[380px] lg:border-r">
        <p className="text-[11px] text-white/30">Editing {nameLine}</p>
        <ThemeSelector
          themes={themes}
          selectedTheme={cert.selectedTheme}
          onSelect={cert.setSelectedTheme}
        />
        <Separator className="bg-white/10" />
        <TextVariantSelector
          variants={textVariants}
          selectedVariant={cert.selectedVariant}
          onSelect={cert.setSelectedVariant}
        />
        <Separator className="bg-white/10" />
        <div className="sticky bottom-4 z-10 space-y-3 bg-[#161b22]/95 pb-2 pt-2 lg:static lg:bg-transparent lg:p-0">
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
            className="flex w-full items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 py-2.5 text-sm text-white/80 transition hover:bg-white/10"
          >
            Share Certificate
          </button>
        </div>
      </aside>
      <section className="flex min-h-0 min-w-0 flex-1 items-start justify-center overflow-y-auto overflow-x-hidden bg-[#0d1117] p-4 sm:p-6 lg:items-center lg:p-10">
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
