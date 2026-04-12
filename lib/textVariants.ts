export type VariantId =
  | 'classical'
  | 'corporate'
  | 'scientific'
  | 'philosophical'

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
]
