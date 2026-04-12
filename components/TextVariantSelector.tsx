'use client'

import type { TextVariant, VariantId } from '@/lib/textVariants'

interface Props {
  variants: TextVariant[]
  selectedVariant: VariantId
  onSelect: (id: VariantId) => void
}

export default function TextVariantSelector({
  variants,
  selectedVariant,
  onSelect,
}: Props) {
  return (
    <div>
      <h3 className="mb-3 text-[10px] font-medium tracking-[0.22em] text-app-muted uppercase">
        Certificate Text
      </h3>
      <div className="flex flex-col gap-2">
        {variants.map((v) => {
          const selected = v.id === selectedVariant
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(v.id)}
              className={`rounded-lg border px-3 py-2.5 text-left transition-all duration-200 ${
                selected
                  ? 'border-white/30 bg-white/[0.08]'
                  : 'border-white/[0.08] hover:border-white/[0.15]'
              }`}
            >
              <p className="text-[13px] font-semibold text-app">{v.label}</p>
              <p className="mt-0.5 text-[11px] text-app-muted italic">
                {v.preview}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
