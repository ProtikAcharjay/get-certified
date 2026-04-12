'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCertificate } from '@/hooks/useCertificate'
import { parseThemeId, parseVariantId } from '@/lib/urlParams'
import EntryForm from '@/components/EntryForm'
import QualificationQuiz from '@/components/QualificationQuiz'
import CertificateBoomReveal from '@/components/CertificateBoomReveal'
import CertificateStudio from '@/components/CertificateStudio'
import ShareModal from '@/components/ShareModal'

function HomeInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const urlName = searchParams.get('name') ?? ''
  const urlCertified = searchParams.get('certified') ?? ''
  const urlTheme = parseThemeId(searchParams.get('theme'))
  const urlVariant = parseVariantId(searchParams.get('variant'))
  const skipToStudio = urlName.length > 0 && urlCertified.length > 0

  const cert = useCertificate(
    urlName,
    urlCertified,
    urlTheme,
    urlVariant,
    skipToStudio ? 'studio' : 'entry',
  )

  useEffect(() => {
    if (cert.stage !== 'studio') return
    const params = new URLSearchParams({
      name: cert.recipientName,
      certified: cert.achievement,
      theme: cert.selectedTheme,
      variant: cert.selectedVariant,
    })
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [
    cert.recipientName,
    cert.achievement,
    cert.selectedTheme,
    cert.selectedVariant,
    cert.stage,
    router,
    pathname,
  ])

  return (
    <div className="flex min-h-screen flex-col bg-[#0d1117]">
      <header className="flex shrink-0 flex-col gap-3 border-b border-white/10 px-6 py-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 text-left">
          <p className="text-[10px] tracking-[0.2em] text-white/35 uppercase">
            Global Institute of Excellence
          </p>
          <h1 className="text-lg font-semibold tracking-wide text-white">
            GetCertified
          </h1>
          <p className="mt-0.5 text-xs tracking-widest text-white/40 uppercase">
            Skills Optional. Certificate Guaranteed.
          </p>
        </div>
      </header>

      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        {cert.stage === 'entry' && (
          <EntryForm
            recipientName={cert.recipientName}
            achievement={cert.achievement}
            onNameChange={cert.setRecipientName}
            onAchievementChange={cert.setAchievement}
            isComplete={cert.isEntryComplete}
            onSubmit={() => cert.setStage('quiz')}
          />
        )}
        {cert.stage === 'quiz' && (
          <QualificationQuiz
            recipientName={cert.recipientName}
            quizAnswers={cert.quizAnswers}
            quizRevealed={cert.quizRevealed}
            onAnswer={cert.answerQuestion}
            onReveal={() => cert.setQuizRevealed(true)}
            isQuizComplete={cert.isQuizComplete}
            onClaim={() => cert.setStage('boom')}
          />
        )}
        {cert.stage === 'boom' && (
          <CertificateBoomReveal
            recipientName={cert.recipientName}
            achievement={cert.achievement}
            onComplete={cert.onBoomComplete}
          />
        )}
        {cert.stage === 'studio' && <CertificateStudio cert={cert} />}
      </main>

      <footer className="shrink-0 border-t border-white/10 px-6 py-3 text-center">
        <p className="mx-auto max-w-3xl text-xs leading-relaxed text-white/20">
          GetCertified is a satirical platform. No qualifications are assessed.
          No skills are verified. No responsibility is assumed. Certificates
          produced herein are works of creative expression and carry no
          professional, legal, or academic standing. By generating a certificate,
          you confirm that you understand this, and also that you don&apos;t
          care.
        </p>
      </footer>

      <ShareModal
        isOpen={cert.isShareModalOpen}
        onClose={() => cert.setIsShareModalOpen(false)}
        shareUrl={cert.shareUrl}
        recipientName={cert.recipientName}
        achievement={cert.achievement}
        certificateId="certificate-share"
      />
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
      <HomeInner />
    </Suspense>
  )
}
