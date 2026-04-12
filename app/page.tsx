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
    <div className="flex min-h-screen flex-col">
      <header className="flex shrink-0 flex-col gap-3 border-b border-white/[0.09] bg-[#090b0f]/75 px-6 py-5 backdrop-blur-xl sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 text-left">
          <p className="text-[10px] font-medium tracking-[0.22em] text-app-muted uppercase">
            certifypromax · the pro max tier of paper prestige (satirical)
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-app">
            Certify Pro Max
          </h1>
          <p className="mt-1 max-w-xl text-[11px] leading-snug tracking-[0.12em] text-app-secondary uppercase">
            no-skills certification · ~60 sec · free · shareable · zero real
            qualifications required
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

      <footer className="shrink-0 border-t border-white/[0.09] bg-[#090b0f]/40 px-6 py-4 text-center backdrop-blur-sm">
        <p className="mx-auto max-w-3xl text-xs leading-relaxed text-app-faint">
          <span className="text-app-muted">
            Looking for a no-skills certification, a funny certificate to post,
            or a free instant certificate you can finish in about a minute?
            You&apos;re in the right place—for entertainment only.
          </span>{' '}
          Certify Pro Max is satire: no qualifications are assessed, no skills are
          verified, no responsibility is assumed. Certificates are creative
          expression only, not professional, legal, or academic standing. By
          generating one, you get the bit—and you don&apos;t care.
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
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090b0f]" aria-hidden />
      }
    >
      <HomeInner />
    </Suspense>
  )
}
