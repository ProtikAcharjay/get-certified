'use client'

import { useEffect, useState } from 'react'

interface Props {
  recipientName: string
  achievement: string
  onComplete: () => void
}

const CONFETTI = [
  { w: 8, h: 12, bg: '#B8860B', left: '42%', top: '38%', delay:0, dur: 1.1 },
  { w: 10, h: 14, bg: '#C9A84C', left: '55%', top: '40%', delay: 40, dur: 0.95 },
  { w: 7, h: 16, bg: '#ffffff', left: '48%', top: '35%', delay: 80, dur: 1.2 },
  { w: 12, h: 9, bg: '#58A6FF', left: '60%', top: '45%', delay: 20, dur: 1.05 },
  { w: 9, h: 11, bg: '#22c55e', left: '38%', top: '44%', delay: 60, dur: 0.88 },
  { w: 11, h: 13, bg: '#B8860B', left: '52%', top: '48%', delay: 100, dur: 1.15 },
  { w: 6, h: 10, bg: '#ffffff', left: '45%', top: '42%', delay: 30, dur: 0.92 },
  { w: 13, h: 8, bg: '#C9A84C', left: '58%', top: '36%', delay: 70, dur: 1.3 },
  { w: 8, h: 15, bg: '#1B2A4A', left: '40%', top: '46%', delay: 50, dur: 1.0 },
  { w: 10, h: 10, bg: '#58A6FF', left: '50%', top: '41%', delay: 90, dur: 0.85 },
  { w: 7, h: 14, bg: '#22c55e', left: '54%', top: '43%', delay: 10, dur: 1.12 },
  { w: 9, h: 12, bg: '#B8860B', left: '46%', top: '39%', delay: 110, dur: 0.98 },
]

function BoomStarburst() {
  return (
    <svg
      width={200}
      height={200}
      viewBox="0 0 200 200"
      className="animate-boom-scale"
      aria-hidden
    >
      <defs>
        <linearGradient id="boomGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0C040" />
          <stop offset="45%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#8A6A12" />
        </linearGradient>
      </defs>
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i * 360) / 14
        return (
          <polygon
            key={i}
            points="100,100 108,40 100,100 92,40"
            fill="url(#boomGold)"
            transform={`rotate(${angle} 100 100)`}
            opacity={0.92}
          />
        )
      })}
      <circle cx={100} cy={100} r={28} fill="url(#boomGold)" opacity={0.95} />
    </svg>
  )
}

export default function CertificateBoomReveal({
  recipientName,
  achievement,
  onComplete,
}: Props) {
  const [showBurst, setShowBurst] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showAchievement, setShowAchievement] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowBurst(true), 150)
    const t2 = setTimeout(() => setShowTitle(true), 300)
    const t3 = setTimeout(() => setShowName(true), 500)
    const t4 = setTimeout(() => setShowAchievement(true), 700)
    const t5 = setTimeout(() => setShowConfetti(true), 900)
    const t6 = setTimeout(() => setFadeOut(true), 2500)
    const done = setTimeout(() => onComplete(), 2800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
      clearTimeout(t6)
      clearTimeout(done)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
        {showBurst && (
          <div className="flex justify-center">
            <BoomStarburst />
          </div>
        )}
        {showTitle && (
          <h2
            className="shimmer-text mt-6 px-2 font-semibold"
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.1,
            }}
          >
            CERTIFICATE EARNED
          </h2>
        )}
        {showName && (
          <p
            className="mt-5 text-zinc-200 italic"
            style={{
              fontFamily: 'var(--font-great-vibes), cursive',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            }}
          >
            Congratulations, {recipientName}
          </p>
        )}
        {showAchievement && (
          <p
            className="mt-2 tracking-wide text-[#c4b896]"
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            }}
          >
            Officially Certified in {achievement}
          </p>
        )}

        {showConfetti && (
          <div className="pointer-events-none absolute inset-0 overflow-visible">
            {CONFETTI.map((c, i) => (
              <div
                key={i}
                className="absolute rounded-[1px]"
                style={{
                  width: c.w,
                  height: c.h,
                  backgroundColor: c.bg,
                  left: c.left,
                  top: c.top,
                  animation: `confetti-fall ${c.dur}s ease-out forwards`,
                  animationDelay: `${c.delay}ms`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
