'use client'

import type { CSSProperties } from 'react'
import { useId, useLayoutEffect, useRef, useState } from 'react'
import type { ThemeId } from '@/lib/themes'
import type { VariantId } from '@/lib/textVariants'
import { textVariants } from '@/lib/textVariants'
import { cn } from '@/lib/utils'
import SignatureBlock from '@/components/SignatureBlock'

/** Canonical export width — PNG, print, and studio preview use the same design scaled uniformly. */
export const CERTIFICATE_EXPORT_WIDTH_PX = 1000

interface Props {
  recipientName: string
  achievement: string
  selectedTheme: ThemeId
  selectedVariant: VariantId
  dateAwarded: string
  /** Root element id for capture / print CSS */
  instanceId?: string
  /**
   * studio: 1000px design scaled to fit the column (matches PNG/download).
   * export: fixed width for capture and print page.
   */
  layout?: 'studio' | 'export'
}

function OrnamentalDivider({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-3 w-[120px] max-w-full', className)}
      height={12}
      viewBox="0 0 120 12"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <line
        x1={10}
        y1={6}
        x2={52}
        y2={6}
        stroke="var(--cert-border)"
        strokeWidth={1}
      />
      <polygon points="60,2.5 64,6 60,9.5 56,6" fill="var(--cert-border)" />
      <line
        x1={68}
        y1={6}
        x2={110}
        y2={6}
        stroke="var(--cert-border)"
        strokeWidth={1}
      />
    </svg>
  )
}

/** Same geometry as Emerald — only theme colors differ via CSS vars on the root. */
function WatermarkSeal({ svgIdPrefix }: { svgIdPrefix: string }) {
  const arcT = `${svgIdPrefix}-wmArcTop`
  const arcB = `${svgIdPrefix}-wmArcBot`

  return (
    <svg
      className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
      viewBox="0 0 200 200"
      aria-hidden
    >
      <defs>
        <path id={arcT} d="M 45,100 A 55,55 0 0 1 155,100" fill="none" />
        <path id={arcB} d="M 155,100 A 55,55 0 0 1 45,100" fill="none" />
      </defs>
      <circle
        cx={100}
        cy={100}
        r={88}
        fill="none"
        stroke="var(--cert-border)"
        strokeWidth={1.5}
      />
      <circle
        cx={100}
        cy={100}
        r={74}
        fill="none"
        stroke="var(--cert-border)"
        strokeWidth={1}
      />
      <text
        fill="var(--cert-border)"
        fontSize={9}
        style={{ fontFamily: 'var(--cert-body-font)' }}
      >
        <textPath href={`#${arcT}`} startOffset="50%" textAnchor="middle">
          CERTIFY · PRO · MAX
        </textPath>
      </text>
      <text
        fill="var(--cert-border)"
        fontSize={9}
        style={{ fontFamily: 'var(--cert-body-font)' }}
      >
        <textPath href={`#${arcB}`} startOffset="50%" textAnchor="middle">
          EST. SINCE THE BEGINNING OF TIME
        </textPath>
      </text>
      <polygon
        points="100,82 104,96 118,96 107,104 111,118 100,110 89,118 93,104 82,96 96,96"
        fill="var(--cert-border)"
      />
    </svg>
  )
}

interface CanvasProps {
  instanceId: string
  selectedTheme: ThemeId
  recipientName: string
  achievement: string
  selectedVariant: VariantId
  dateAwarded: string
  svgIdPrefix: string
  className?: string
}

function CertificateCanvas({
  instanceId,
  selectedTheme,
  recipientName,
  achievement,
  selectedVariant,
  dateAwarded,
  svgIdPrefix,
  className,
}: CanvasProps) {
  const displayName = recipientName.trim() || 'Your Name Here'
  const displayAchievement =
    achievement.trim() || 'Outstanding Nothingness'
  const variantText =
    textVariants.find((v) => v.id === selectedVariant)?.full ?? ''

  return (
    <div
      id={instanceId}
      data-theme={selectedTheme}
      style={
        {
          backgroundColor: 'var(--cert-bg)',
          /* Pin to Emerald’s font metrics on every theme; colors still from [data-theme] */
          '--cert-heading-font': 'var(--font-libre-baskerville)',
          '--cert-body-font': 'var(--font-dm-sans)',
        } as CSSProperties
      }
      className={cn(
        'relative aspect-[1.414/1] w-[1000px] max-w-none shrink-0 overflow-hidden select-none',
        className,
      )}
    >
      <WatermarkSeal svgIdPrefix={svgIdPrefix} />
      <div
        className="absolute inset-3 z-10 border-[3px]"
        style={{ borderColor: 'var(--cert-border)' }}
      >
        <div
          className="absolute inset-[4px] border"
          style={{ borderColor: 'var(--cert-border-2)' }}
        >
          <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] items-stretch gap-y-3 px-10 py-6 text-center">
            <div className="flex w-full flex-col items-center gap-1">
              <p
                style={{
                  color: 'var(--cert-muted)',
                  fontFamily: 'var(--cert-body-font)',
                }}
                className="text-[9px] tracking-[0.35em] uppercase"
              >
                Certify Pro Max · Institute of Instant Prestige
              </p>
              <OrnamentalDivider />
            </div>

            <div className="flex min-h-0 w-full flex-col items-center justify-center gap-1.5 overflow-hidden">
              <h2
                style={{
                  color: 'var(--cert-primary)',
                  fontFamily: 'var(--cert-heading-font)',
                }}
                className="text-[11px] font-semibold tracking-[0.4em] uppercase"
              >
                Certificate of Achievement
              </h2>
              <p
                style={{
                  color: 'var(--cert-muted)',
                  fontFamily: 'var(--cert-body-font)',
                }}
                className="mt-1 text-[9px] tracking-[0.2em] uppercase"
              >
                This certifies that
              </p>
              <h1
                style={{
                  color: 'var(--cert-text)',
                  fontFamily: 'var(--cert-heading-font)',
                }}
                className="text-[26px] font-semibold leading-tight italic"
              >
                {displayName}
              </h1>
              <p
                style={{
                  color: 'var(--cert-muted)',
                  fontFamily: 'var(--cert-body-font)',
                }}
                className="text-[9px] tracking-[0.2em] uppercase"
              >
                has been officially certified in
              </p>
              <h3
                style={{
                  color: 'var(--cert-accent)',
                  fontFamily: 'var(--cert-heading-font)',
                }}
                className="text-[17px] font-bold leading-snug tracking-wide"
              >
                {displayAchievement}
              </h3>
              <OrnamentalDivider className="mt-1 w-32" />
              <p
                style={{
                  color: 'var(--cert-body-text)',
                  fontFamily: 'var(--cert-body-font)',
                }}
                className="max-w-[68%] text-[8.5px] leading-relaxed italic opacity-80"
              >
                {variantText}
              </p>
            </div>

            <div className="flex w-full flex-col items-center gap-3">
              <div className="flex justify-center gap-10">
                <div className="text-center">
                  <p
                    style={{
                      color: 'var(--cert-muted)',
                      fontFamily: 'var(--cert-body-font)',
                    }}
                    className="text-[7.5px] tracking-[0.2em] uppercase"
                  >
                    Date Awarded
                  </p>
                  <p
                    style={{
                      color: 'var(--cert-text)',
                      fontFamily: 'var(--cert-heading-font)',
                    }}
                    className="mt-0.5 text-[10px] italic"
                  >
                    {dateAwarded}
                  </p>
                </div>
                <div className="text-center">
                  <p
                    style={{
                      color: 'var(--cert-muted)',
                      fontFamily: 'var(--cert-body-font)',
                    }}
                    className="text-[7.5px] tracking-[0.2em] uppercase"
                  >
                    Valid Until
                  </p>
                  <p
                    style={{
                      color: 'var(--cert-text)',
                      fontFamily: 'var(--cert-heading-font)',
                    }}
                    className="mt-0.5 text-[10px] italic"
                  >
                    The End of the World
                  </p>
                </div>
              </div>
              <SignatureBlock theme={selectedTheme} svgIdPrefix={svgIdPrefix} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CertificatePreview({
  recipientName,
  achievement,
  selectedTheme,
  selectedVariant,
  dateAwarded,
  instanceId = 'certificate-preview',
  layout = 'studio',
}: Props) {
  const svgIdPrefix = useId().replace(/:/g, '')
  const scaleHostRef = useRef<HTMLDivElement>(null)
  const [studioScale, setStudioScale] = useState(1)

  useLayoutEffect(() => {
    if (layout !== 'studio') return
    const el = scaleHostRef.current
    if (!el) return

    function update() {
      const node = scaleHostRef.current
      if (!node) return
      const w = node.clientWidth
      if (w <= 0) return
      setStudioScale(Math.min(1, w / CERTIFICATE_EXPORT_WIDTH_PX))
    }

    function updateSoon() {
      update()
      const node = scaleHostRef.current
      if (node && node.clientWidth <= 0) {
        requestAnimationFrame(() => {
          update()
          const n = scaleHostRef.current
          if (n && n.clientWidth <= 0) requestAnimationFrame(update)
        })
      }
    }

    updateSoon()
    const ro = new ResizeObserver(() => update())
    ro.observe(el)
    return () => ro.disconnect()
  }, [layout])

  if (layout === 'export') {
    return (
      <CertificateCanvas
        instanceId={instanceId}
        selectedTheme={selectedTheme}
        recipientName={recipientName}
        achievement={achievement}
        selectedVariant={selectedVariant}
        dateAwarded={dateAwarded}
        svgIdPrefix={svgIdPrefix}
      />
    )
  }

  return (
    <div
      ref={scaleHostRef}
      className="mx-auto w-full max-w-[1000px]"
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '1.414 / 1' }}
      >
        <div
          className="absolute top-0 left-1/2 w-[1000px] origin-top will-change-transform"
          style={{
            transform: `translateX(-50%) scale(${studioScale}) translateZ(0)`,
          }}
        >
          <CertificateCanvas
            instanceId={instanceId}
            selectedTheme={selectedTheme}
            recipientName={recipientName}
            achievement={achievement}
            selectedVariant={selectedVariant}
            dateAwarded={dateAwarded}
            svgIdPrefix={svgIdPrefix}
          />
        </div>
      </div>
    </div>
  )
}
