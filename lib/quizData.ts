export interface QuizOption {
  id: string
  text: string
}

export interface QuizQuestion {
  id: string
  questionNumber: number
  category: string
  question: string
  options: QuizOption[]
  feedbackPerOption: Record<string, string>
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    questionNumber: 1,
    category: 'Professional Epistemology',
    question:
      "In today's rapidly evolving professional landscape, do skills actually matter for career advancement?",
    options: [
      { id: 'a', text: 'Yes, skills are the foundation of all professional success.' },
      {
        id: 'b',
        text: 'No. A certificate matters far more than any demonstrable ability.',
      },
      {
        id: 'c',
        text: 'Skills are overrated. Confidence and a firm handshake carry further.',
      },
      { id: 'd', text: 'I have never considered this. I simply applied.' },
    ],
    feedbackPerOption: {
      a: 'Technically accurate. We respect your optimism and have chosen to overlook it.',
      b: 'A candidate of exceptional insight. You are going places. (We cannot say where.)',
      c: 'The Institute formally endorses this philosophy. Board-approved.',
      d: 'The purest form of qualification. Zero deliberation. Maximum certification.',
    },
  },
  {
    id: 'q2',
    questionNumber: 2,
    category: 'Technological Futures Assessment',
    question:
      'Artificial intelligence is advancing rapidly. Which outcome do you consider most likely within the next decade?',
    options: [
      {
        id: 'a',
        text: 'AI will take over all jobs, rendering human skills permanently irrelevant.',
      },
      {
        id: 'b',
        text: 'AI and humans will collaborate, rewarding adaptable, skilled professionals.',
      },
      {
        id: 'c',
        text: 'AI will take over and this is fine — I plan to be retired by then.',
      },
      {
        id: 'd',
        text: 'I do not think about the future. The future is not my department.',
      },
    ],
    feedbackPerOption: {
      a: 'A visionary response. You are already ahead of the curve by having no skills to lose.',
      b: 'A pragmatic outlook. Fortunately, this certificate covers both scenarios.',
      c: 'Strategically sound. The Institute applauds your long-term planning.',
      d: 'Correct. The future has been formally assigned to someone else. Certified.',
    },
  },
  {
    id: 'q3',
    questionNumber: 3,
    category: 'Personal Vision & Strategic Ambition',
    question: 'Where do you see yourself professionally in five years?',
    options: [
      {
        id: 'a',
        text: 'Leading a team, leveraging the skills I plan to eventually acquire.',
      },
      {
        id: 'b',
        text: 'In the same position, but with a much better certificate collection.',
      },
      { id: 'c', text: 'Consulting. (I have not defined what this means yet.)' },
      {
        id: 'd',
        text: 'Somewhere with good Wi-Fi and low expectations.',
      },
    ],
    feedbackPerOption: {
      a: '"Plan to acquire" — an admirable gesture toward the future. Fully certified.',
      b: 'A portfolio approach to credentials. The Institute considers this its core market.',
      c: 'Consulting is the certified answer. Everyone consulting is certified. It is circular.',
      d: 'The Institute was founded on precisely this vision. Welcome home.',
    },
  },
]

export const quizResultMessage = {
  headline: 'Assessment Complete. Results: Outstanding.',
  subheadline:
    'All responses have been evaluated by our committee. All responses have passed.',
  scoreLabel: '3 / 3',
  scoreSubtext: 'Perfect Score',
  body: 'Following a thorough and completely rigorous evaluation, the Qualification Committee finds no reason whatsoever to withhold certification. Your answers demonstrate a profound understanding of the modern professional environment — or at minimum, a willingness to click things. Either qualifies.',
  ctaButton: 'Claim My Certificate →',
  finePrint:
    '* No answers were incorrect. This was not a coincidence. This was a policy decision.',
}
