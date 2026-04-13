import type { Metadata } from 'next'
import Script from 'next/script'
import {
  Cormorant_Garamond,
  Playfair_Display,
  EB_Garamond,
  Libre_Baskerville,
  DM_Sans,
  Dancing_Script,
  Great_Vibes,
  Pinyon_Script,
} from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
})

const pinyonScript = Pinyon_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pinyon',
})

const fontVariables = [
  cormorant.variable,
  playfair.variable,
  ebGaramond.variable,
  libreBaskerville.variable,
  dmSans.variable,
  dancingScript.variable,
  greatVibes.variable,
  pinyonScript.variable,
].join(' ')

const siteUrl = 'https://certifypromax.vercel.app'

const siteDescription =
  'Certify Pro Max: no-skills certification in about 60 seconds—a free, funny, shareable certificate for literally anything. No courses, no gatekeeping—name it, tap through, download, flex. Satire; not a real credential. certifypromax.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'Certify Pro Max — No-Skills Certificate in ~60 Seconds (Free) | certifypromax',
    template: '%s | Certify Pro Max',
  },
  description: siteDescription,
  keywords: [
    'certifypromax',
    'Certify Pro Max',
    'no skills certification',
    'no skill certificate',
    'free certificate online',
    'funny certificate',
    'fake certificate generator',
    'instant certificate',
    'certificate in 60 seconds',
    'shareable certificate',
    'joke certification',
    'satirical certificate',
    'Gen Z certificate',
    'certificate for anything',
    'no exam certification',
    'download certificate PNG',
  ],
  authors: [{ name: 'Certify Pro Max' }],
  openGraph: {
    title:
      'Certify Pro Max — No-skills certification in a minute. Free. Shareable.',
    description: siteDescription,
    type: 'website',
    siteName: 'Certify Pro Max',
    url: siteUrl,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certify Pro Max — no skills? still pro max. ~60 sec.',
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  other: {
    'google-adsense-account': 'ca-pub-9324302603622873',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Certify Pro Max',
  alternateName: 'certifypromax',
  url: siteUrl,
  description: siteDescription,
  applicationCategory: 'EntertainmentApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a no-skills certification?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Certify Pro Max (certifypromax) is a satirical, for-fun flow: you pick a title, breeze through a playful quiz, and get a downloadable, shareable certificate in about a minute. It is not a real professional or academic credential.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need any skills or training?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. That is the point. The experience is designed as a humorous “no skills certification” you can finish quickly and share with friends.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to get a certificate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most people complete the whole flow in roughly 60 seconds to a few minutes, depending on how fast you type and tap.',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-full flex flex-col antialiased">
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9324302603622873"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
        {children}
      </body>
    </html>
  )
}
