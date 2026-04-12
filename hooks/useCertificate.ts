'use client'

import { useCallback, useEffect, useState } from 'react'
import type { ThemeId } from '@/lib/themes'
import type { VariantId } from '@/lib/textVariants'
import { buildShareUrl } from '@/lib/shareUtils'

export type AppStage = 'entry' | 'quiz' | 'boom' | 'studio'

export interface CertificateState {
  stage: AppStage
  recipientName: string
  achievement: string
  selectedTheme: ThemeId
  selectedVariant: VariantId
  dateAwarded: string
  quizAnswers: Record<string, string>
  quizRevealed: boolean
  shareUrl: string
  isShareModalOpen: boolean
}

export function useCertificate(
  initialName = '',
  initialAchievement = '',
  initialTheme: ThemeId = 'imperial-gold',
  initialVariant: VariantId = 'classical',
  initialStage: AppStage = 'entry',
) {
  const [stage, setStage] = useState<AppStage>(initialStage)
  const [recipientName, setRecipientName] = useState(initialName)
  const [achievement, setAchievement] = useState(initialAchievement)
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(initialTheme)
  const [selectedVariant, setSelectedVariant] =
    useState<VariantId>(initialVariant)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizRevealed, setQuizRevealed] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  /** Stable for the session so shared links match the certificate date line. */
  const [dateAwarded] = useState(() =>
    new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  )

  useEffect(() => {
    queueMicrotask(() => {
      setShareUrl(
        buildShareUrl({
          name: recipientName,
          achievement,
          theme: selectedTheme,
          variant: selectedVariant,
          date: dateAwarded,
        }),
      )
    })
  }, [recipientName, achievement, selectedTheme, selectedVariant, dateAwarded])

  const isEntryComplete =
    recipientName.trim().length >= 2 && achievement.trim().length >= 2
  const isQuizComplete = Object.keys(quizAnswers).length === 3

  function answerQuestion(questionId: string, optionId: string) {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const onBoomComplete = useCallback(() => {
    setStage('studio')
  }, [])

  return {
    stage,
    setStage,
    recipientName,
    setRecipientName,
    achievement,
    setAchievement,
    selectedTheme,
    setSelectedTheme,
    selectedVariant,
    setSelectedVariant,
    quizAnswers,
    answerQuestion,
    quizRevealed,
    setQuizRevealed,
    dateAwarded,
    shareUrl,
    isShareModalOpen,
    setIsShareModalOpen,
    isEntryComplete,
    isQuizComplete,
    onBoomComplete,
  }
}

export type UseCertificateReturn = ReturnType<typeof useCertificate>
