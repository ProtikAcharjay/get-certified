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
      <div className="animate-fade-slide-up w-full max-w-[480px] rounded-2xl border border-white/10 bg-[#161b22] p-8 md:p-10">
        <div className="mb-6 flex justify-center text-[#C9A84C]">
          <Award className="h-10 w-10" strokeWidth={1.25} aria-hidden />
        </div>
        <h2 className="text-center text-xl font-semibold tracking-tight text-white md:text-2xl">
          Begin Your Certification
        </h2>
        <p className="mt-2 text-center text-sm text-white/55">
          Please provide your details below. Our committee is standing by.
        </p>
        <Separator className="my-6 bg-white/10" />
        <div className="space-y-6">
          <div>
            <Label
              htmlFor="full-name"
              className="mb-1.5 block text-[10px] font-medium tracking-[0.25em] text-white/50 uppercase"
            >
              Full Name
            </Label>
            <Input
              id="full-name"
              value={recipientName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. Jonathan P. Worthington"
              className="rounded-lg border-white/15 bg-[#0d1117] text-white placeholder:text-white/25 focus-visible:border-white/40 focus-visible:ring-0"
            />
            <p className="mt-1.5 text-[11px] text-white/30">
              Your name as it will appear on the official certificate
            </p>
          </div>
          <div>
            <Label
              htmlFor="cert-area"
              className="mb-1.5 block text-[10px] font-medium tracking-[0.25em] text-white/50 uppercase"
            >
              Area of Certification
            </Label>
            <Input
              id="cert-area"
              value={achievement}
              onChange={(e) => onAchievementChange(e.target.value)}
              placeholder="e.g. Advanced Procrastination"
              className="rounded-lg border-white/15 bg-[#0d1117] text-white placeholder:text-white/25 focus-visible:border-white/40 focus-visible:ring-0"
            />
            <p className="mt-1.5 text-[11px] text-white/30">
              The field in which you wish to be certified (skills not required)
            </p>
          </div>
        </div>
        <Button
          type="button"
          disabled={!isComplete}
          onClick={onSubmit}
          className="mt-8 w-full rounded-lg bg-white py-3 font-semibold text-[#0d1117] hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isComplete
            ? 'Begin Assessment →'
            : 'Complete the fields above to proceed'}
        </Button>
        <p className="mt-3 text-center text-[10px] text-white/20 italic">
          Clicking this button constitutes enrollment. No refunds. Nothing was
          charged.
        </p>
      </div>
    </div>
  )
}
