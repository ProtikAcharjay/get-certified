'use client'

import type { ThemeId } from '@/lib/themes'

interface Props {
  theme: ThemeId
  /** Unique prefix so seal SVG ids never collide when multiple certs mount */
  svgIdPrefix: string
}

export default function SignatureBlock({ theme, svgIdPrefix }: Props) {
  const top = `${svgIdPrefix}-sealTop`
  const bot = `${svgIdPrefix}-sealBot`
  return (
    <div
      className="flex w-full items-end justify-between gap-4 px-2"
      data-signature-theme={theme}
    >
      <div className="max-w-[130px] flex-1 text-center">
        <p
          className="italic"
          style={{
            fontFamily: 'var(--font-great-vibes), cursive',
            fontSize: 26,
            color: 'var(--cert-primary)',
          }}
        >
          Protik Acharjay
        </p>
        <div
          className="mx-auto my-1 h-px w-[130px]"
          style={{ backgroundColor: 'var(--cert-muted)' }}
        />
        <p
          className="text-[8px] tracking-widest uppercase"
          style={{
            fontFamily: 'var(--cert-body-font)',
            color: 'var(--cert-text)',
          }}
        >
          PROTIK ACHARJAY
        </p>
        <p
          className="mt-0.5 text-[7.5px]"
          style={{
            fontFamily: 'var(--cert-body-font)',
            color: 'var(--cert-muted)',
          }}
        >
          Chief Certification Officer
        </p>
      </div>

      <div className="flex shrink-0 justify-center pb-1">
        <svg width={70} height={70} viewBox="0 0 70 70" aria-hidden>
          <defs>
            <path
              id={top}
              d="M 35 10 A 18 18 0 1 1 34.99 10"
              fill="none"
            />
            <path
              id={bot}
              d="M 35 60 A 18 18 0 1 0 35.01 60"
              fill="none"
            />
          </defs>
          <circle
            cx={35}
            cy={35}
            r={32}
            fill="none"
            stroke="var(--cert-border)"
            strokeWidth={1.2}
          />
          <circle
            cx={35}
            cy={35}
            r={26}
            fill="none"
            stroke="var(--cert-border)"
            strokeWidth={0.9}
            strokeDasharray="3 2"
          />
          <text
            fill="var(--cert-border)"
            fontSize={6}
            style={{ fontFamily: 'var(--cert-body-font)' }}
          >
            <textPath href={`#${top}`} startOffset="50%" textAnchor="middle">
              GETCERTIFIED
            </textPath>
          </text>
          <text
            fill="var(--cert-border)"
            fontSize={5}
            style={{ fontFamily: 'var(--cert-body-font)' }}
          >
            <textPath href={`#${bot}`} startOffset="50%" textAnchor="middle">
              EST. SINCE THE BEGINNING
            </textPath>
          </text>
          <path
            d="M35 28 L36.76 33.53 L42.9 33.53 L38.07 37.15 L39.76 43.24 L35 39.42 L30.24 43.24 L31.93 37.15 L27.1 33.53 L33.24 33.53 Z"
            fill="var(--cert-border)"
          />
        </svg>
      </div>

      <div className="max-w-[130px] flex-1 text-center">
        <p
          className="italic"
          style={{
            fontFamily: 'var(--font-pinyon), cursive',
            fontSize: 30,
            color: 'var(--cert-primary)',
          }}
        >
          Donald Trump
        </p>
        <div
          className="mx-auto my-1 h-px w-[130px]"
          style={{ backgroundColor: 'var(--cert-muted)' }}
        />
        <p
          className="text-[8px] tracking-widest uppercase"
          style={{
            fontFamily: 'var(--cert-body-font)',
            color: 'var(--cert-text)',
          }}
        >
          DONALD TRUMP
        </p>
        <p
          className="mt-0.5 text-[7.5px]"
          style={{
            fontFamily: 'var(--cert-body-font)',
            color: 'var(--cert-muted)',
          }}
        >
          Director of Standards &amp; Integrity
        </p>
      </div>
    </div>
  )
}
