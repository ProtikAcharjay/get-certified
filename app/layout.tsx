import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'GetCertified — Skills Optional. Certificate Guaranteed.',
  description:
    "The world's most honest certification platform. No skills required. No evaluation conducted. Full credentials awarded.",
  openGraph: {
    title: 'GetCertified',
    description: 'Get certified in anything. Prove nothing.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  )
}
