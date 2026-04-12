'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { quizQuestions, quizResultMessage } from '@/lib/quizData'

interface Props {
  recipientName: string
  quizAnswers: Record<string, string>
  quizRevealed: boolean
  onAnswer: (questionId: string, optionId: string) => void
  onReveal: () => void
  isQuizComplete: boolean
  onClaim: () => void
}

const LETTERS = ['A', 'B', 'C', 'D']

export default function QualificationQuiz({
  recipientName,
  quizAnswers,
  quizRevealed,
  onAnswer,
  onReveal,
  isQuizComplete,
  onClaim,
}: Props) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [showSeeResults, setShowSeeResults] = useState(false)
  const [pressedOption, setPressedOption] = useState<string | null>(null)
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current)
    }
  }, [])

  function handleOptionClick(questionId: string, optionId: string) {
    if (quizRevealed || showSeeResults) return
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current)
    onAnswer(questionId, optionId)
    setPressedOption(optionId)
    advanceTimerRef.current = setTimeout(() => {
      advanceTimerRef.current = null
      setPressedOption(null)
      setActiveQuestionIndex((i) => {
        if (i < quizQuestions.length - 1) return i + 1
        setShowSeeResults(true)
        return i
      })
    }, 400)
  }

  const currentQuestion = quizQuestions[activeQuestionIndex]

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 md:px-6">
      <div className="surface-card w-full max-w-[640px] p-8">
        <p className="mb-6 text-center text-[11px] text-app-muted">
          Qualification Assessment — {recipientName}
        </p>

        {!quizRevealed && (
          <>
            <div className="mb-8 flex items-center justify-between gap-2">
              {quizQuestions.map((q, idx) => {
                const done = Boolean(quizAnswers[q.id])
                const active = idx === activeQuestionIndex && !showSeeResults
                return (
                  <div key={q.id} className="flex flex-1 items-center">
                    <div className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-semibold transition-all duration-200 ${
                          done
                            ? 'border-emerald-600/80 bg-emerald-500/15 text-emerald-400'
                            : active
                              ? 'border-white/25 bg-white/[0.08] text-app'
                              : 'border-white/[0.1] bg-white/[0.03] text-app-faint'
                        }`}
                      >
                        {done ? (
                          <Check className="h-4 w-4" strokeWidth={2.5} />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <span className="hidden text-[9px] tracking-wider text-app-faint uppercase sm:inline">
                        Step {idx + 1}
                      </span>
                    </div>
                    {idx < quizQuestions.length - 1 && (
                      <div
                        className={`mx-1 h-px flex-1 ${
                          quizAnswers[quizQuestions[idx].id]
                            ? 'bg-emerald-500/40'
                            : 'bg-white/[0.08]'
                        }`}
                        aria-hidden
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {!showSeeResults && currentQuestion && (
              <div className="space-y-5">
                <div className="text-center">
                  <p className="text-[11px] font-medium tracking-[0.2em] text-[#b8a882] uppercase">
                    Q.{String(currentQuestion.questionNumber).padStart(2, '0')}
                  </p>
                  <p className="mt-1 text-[10px] tracking-[0.2em] text-app-muted uppercase">
                    {currentQuestion.category}
                  </p>
                  <p
                    className="mt-4 text-[20px] leading-snug font-medium text-app md:text-[22px]"
                    style={{ fontFamily: 'var(--font-playfair), serif' }}
                  >
                    {currentQuestion.question}
                  </p>
                </div>
                <div className="space-y-2.5">
                  {currentQuestion.options.map((opt, oi) => {
                    const letter = LETTERS[oi] ?? String(oi + 1)
                    const selected = quizAnswers[currentQuestion.id] === opt.id
                    const pressed = pressedOption === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          handleOptionClick(currentQuestion.id, opt.id)
                        }
                        className={`flex w-full cursor-pointer items-start gap-3 rounded-lg border px-5 py-3.5 text-left transition-all duration-200 ${
                          pressed || selected
                            ? 'border-white/30 bg-white/[0.1]'
                            : 'border-white/[0.1] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                        }`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white/[0.08] text-xs text-app-secondary">
                          {letter}
                        </span>
                        <span className="text-sm text-app">
                          {opt.text}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {showSeeResults && !quizRevealed && (
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <p className="text-sm text-app-secondary">
                  Your responses have been recorded.
                </p>
                <Button
                  type="button"
                  onClick={onReveal}
                  disabled={!isQuizComplete}
                  className="rounded-lg bg-[#e8eaed] px-8 py-3 font-semibold text-[#0a0c10] shadow-sm hover:bg-white"
                >
                  See My Results
                </Button>
              </div>
            )}
          </>
        )}

        {quizRevealed && (
          <div className="space-y-8">
            <div className="flex flex-col items-center text-center">
              <CheckCircle2
                className="animate-badge-pop h-14 w-14 text-emerald-400"
                strokeWidth={1.75}
              />
              <h2
                className="mt-5 text-2xl font-semibold text-app md:text-3xl"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                {quizResultMessage.headline}
              </h2>
              <p className="mt-2 max-w-md text-sm text-app-secondary">
                {quizResultMessage.subheadline}
              </p>
              <div
                className="animate-pulse-green mt-6 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-300"
              >
                {quizResultMessage.scoreLabel} — {quizResultMessage.scoreSubtext}
              </div>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-app-secondary">
                {quizResultMessage.body}
              </p>
            </div>

            <div className="space-y-4">
              {quizQuestions.map((q, qi) => {
                const sel = quizAnswers[q.id]
                const opt = q.options.find((o) => o.id === sel)
                const feedback = sel ? q.feedbackPerOption[sel] : ''
                return (
                  <div
                    key={q.id}
                    className="animate-quiz-reveal rounded-lg border border-white/[0.08] bg-white/[0.03] p-4"
                    style={{
                      animationDelay: `${120 + qi * 90}ms`,
                      animationFillMode: 'forwards',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] text-app-muted uppercase">
                          Q.{String(q.questionNumber).padStart(2, '0')} ·{' '}
                          {q.category}
                        </p>
                        <p className="mt-2 text-sm font-medium text-emerald-400">
                          {opt?.text}
                        </p>
                        <p className="mt-2 text-xs text-app-secondary italic">
                          {feedback}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-0.5 text-emerald-400">
                        <Check className="h-5 w-5" strokeWidth={2.5} />
                        <span className="text-[10px] font-semibold tracking-wide">
                          Correct
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="text-center text-[11px] text-app-faint italic">
              {quizResultMessage.finePrint}
            </p>
            <Button
              type="button"
              onClick={onClaim}
              className="h-11 w-full rounded-lg bg-[#e8eaed] py-3 font-semibold text-[#0a0c10] shadow-sm hover:bg-white"
            >
              {quizResultMessage.ctaButton}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
