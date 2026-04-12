'use client'

import { Check } from 'lucide-react'
import type { Theme, ThemeId } from '@/lib/themes'

interface Props {
  themes: Theme[]
  selectedTheme: ThemeId
  onSelect: (id: ThemeId) => void
}

export default function ThemeSelector({
  themes: themeList,
  selectedTheme,
  onSelect,
}: Props) {
  return (
    <div>
      <h3 className="mb-3 text-[10px] font-medium tracking-[0.22em] text-app-muted uppercase">
        Certificate Theme
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {themeList.map((theme) => {
          const selected = theme.id === selectedTheme
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onSelect(theme.id)}
              className={`relative rounded-lg border border-white/[0.08] p-3 text-left transition-all duration-200 ${
                selected
                  ? 'ring-2 ring-offset-1 ring-offset-[#101218]'
                  : 'hover:bg-white/[0.04]'
              }`}
              style={
                selected
                  ? {
                      boxShadow: `0 0 0 2px ${theme.previewBorder}`,
                    }
                  : undefined
              }
            >
              {selected && (
                <span
                  className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ backgroundColor: theme.previewBorder }}
                >
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
              )}
              <div
                className="relative mb-2 h-[42px] w-[60px] rounded-sm border-2"
                style={{
                  backgroundColor: theme.previewBg,
                  borderColor: theme.previewBorder,
                }}
              >
                <div
                  className="absolute top-[30%] left-2 h-px"
                  style={{
                    width: '30%',
                    backgroundColor: theme.previewPrimary,
                  }}
                />
                <div
                  className="absolute top-[60%] left-2 h-px"
                  style={{
                    width: '60%',
                    backgroundColor: theme.previewPrimary,
                  }}
                />
              </div>
              <p className="text-[13px] font-semibold text-app">
                {theme.name}
              </p>
              <p className="mt-0.5 text-[11px] text-app-muted">
                {theme.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
