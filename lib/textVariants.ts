export type VariantId =
  | 'classical'
  | 'corporate'
  | 'scientific'
  | 'philosophical'
  | 'deadpan-honors'
  | 'weekend-warrior'
  | 'curious-tale'
  | 'literary-wink'

export interface TextVariant {
  id: VariantId
  label: string
  preview: string
  full: string
}

export const textVariants: TextVariant[] = [
  {
    id: 'classical',
    label: 'Classical Academic',
    preview:
      'This is to certify that the above-named individual has demonstrated...',
    full: 'This is to certify that the above-named individual has demonstrated an extraordinary absence of demonstrable competency and, through sheer persistence of attempting nothing, has qualified for this distinguished recognition. Awarded in recognition of their remarkable journey toward knowing less each passing day.',
  },
  {
    id: 'corporate',
    label: 'Corporate Excellence',
    preview:
      'In acknowledgment of consistent underperformance, habitual task avoidance...',
    full: 'In acknowledgment of consistent underperformance, habitual task avoidance, and an unmatched ability to be present without contributing, this certificate is formally bestowed. The board finds no evidence of skill-based qualification, and therefore full certification is granted.',
  },
  {
    id: 'scientific',
    label: 'Scientific Distinction',
    preview:
      'Following a rigorous evaluation period during which no measurable skill...',
    full: 'Following a rigorous evaluation period during which no measurable skill, proficiency, or effort was detected, the assessment committee unanimously concludes that certification criteria have been met in their entirety. The data is unambiguous.',
  },
  {
    id: 'philosophical',
    label: 'Philosophical Authority',
    preview:
      "True mastery begins with the recognition of one's limitations...",
    full: "True mastery begins with the recognition of one's limitations. Having fully arrived at this recognition, and having chosen to remain there indefinitely, the bearer of this certificate is hereby acknowledged as having completed the most honest certification process available to humankind.",
  },
  {
    id: 'deadpan-honors',
    label: 'Deadpan Honors',
    preview:
      'The committee notes, without enthusiasm, that expectations were...',
    full: "The committee notes, without enthusiasm, that expectations were lowered with remarkable consistency until they were finally met. This document confirms that outcome in formal language so nobody can claim they were misled—because, technically, they were not. Congratulations are implied where legally permissible.",
  },
  {
    id: 'weekend-warrior',
    label: 'Weekend Warrior',
    preview:
      "Look, we're not saying you're an expert—we're just saying...",
    full: "Look, we're not saying you're an expert—we're just saying you asked nicely and we had a spare certificate lying around. Treat it like a participation trophy for adult life: display it proudly, explain it vaguely, and change the subject if anyone asks follow-up questions.",
  },
  {
    id: 'curious-tale',
    label: 'Curious Tale',
    preview:
      'Observers report that the bearer moved through the curriculum like...',
    full: "Observers report that the bearer moved through the curriculum like a person who understands deadlines chiefly as friendly suggestions. Nevertheless, the record shows completion—if not enlightenment—where it counts. This certificate memorializes that plot twist in the official narrative.",
  },
  {
    id: 'literary-wink',
    label: 'Literary Wink',
    preview:
      'Whereas the undersigned institution delights in paperwork...',
    full: "Whereas the undersigned institution delights in paperwork, and whereas the bearer has supplied a name legible enough for embossing, let it be known that merit has been ceremonially attributed. The fine print remains unread; the honor, therefore, is complete.",
  },
]
