'use client'

import { Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

interface Props {
  recipientName: string
  achievement: string
  onNameChange: (v: string) => void
  onAchievementChange: (v: string) => void
  isComplete: boolean
  onSubmit: () => void
}

export default function EntryForm({
  recipientName,
  achievement,
  onNameChange,
  onAchievementChange,
  isComplete,
  onSubmit,
}: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 md:px-6">
      <div className="animate-fade-slide-up surface-card w-full max-w-[480px] p-8 md:p-10">
        <div className="mb-6 flex justify-center text-[#b8a882]">
          <Award className="h-10 w-10" strokeWidth={1.15} aria-hidden />
        </div>
        <h2 className="text-center text-xl font-semibold tracking-tight text-app md:text-2xl">
          Your no-skills certification starts here
        </h2>
        <p className="mt-2 text-center text-sm leading-relaxed text-app-secondary">
          Type your name and whatever you want to be &quot;certified&quot; in—
          no courses, no grind. Most people finish the whole thing in about{' '}
          <span className="text-app">60 seconds</span> and walk away with a
          shareable certificate. Main character energy, zero actual homework.
        </p>
        <Separator className="my-6 bg-white/[0.08]" />
        <div className="space-y-6">
          <div>
            <Label
              htmlFor="full-name"
              className="mb-1.5 block text-[10px] font-medium tracking-[0.22em] text-app-muted uppercase"
            >
              Full Name
            </Label>
            <Input
              id="full-name"
              value={recipientName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. Jonathan P. Worthington"
              className="h-10 rounded-lg border-white/[0.12] bg-[#0a0c10] px-3 text-sm text-app placeholder:text-app-faint focus-visible:border-[#b8a882]/50 focus-visible:ring-0"
            />
            <p className="mt-1.5 text-[11px] text-app-muted">
              Your name as it will appear on the official certificate
            </p>
          </div>
          <div>
            <Label
              htmlFor="cert-area"
              className="mb-1.5 block text-[10px] font-medium tracking-[0.22em] text-app-muted uppercase"
            >
              Area of Certification
            </Label>
            <Input
              id="cert-area"
              value={achievement}
              onChange={(e) => onAchievementChange(e.target.value)}
              placeholder="e.g. Advanced Procrastination"
              className="h-10 rounded-lg border-white/[0.12] bg-[#0a0c10] px-3 text-sm text-app placeholder:text-app-faint focus-visible:border-[#b8a882]/50 focus-visible:ring-0"
            />
            <p className="mt-1.5 text-[11px] text-app-muted">
              Literally anything—&quot;Advanced Napping,&quot; &quot;CEO of
              Vibes,&quot; your call. This is a no-skills certification; talent
              optional.
            </p>
          </div>
        </div>
        <Button
          type="button"
          disabled={!isComplete}
          onClick={onSubmit}
          className="mt-8 h-11 w-full rounded-lg bg-[#e8eaed] py-3 font-semibold text-[#0a0c10] shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isComplete
            ? 'Begin Assessment →'
            : 'Complete the fields above to proceed'}
        </Button>
        <p className="mt-3 text-center text-[10px] leading-snug text-app-faint italic">
          Free, fast, unserious. Clicking enrolls you in the bit—not a real
          school. No charge, no refunds, no transferable skills (probably).
        </p>
      </div>
    </div>
  )
}
