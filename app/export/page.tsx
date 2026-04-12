import { Suspense } from 'react'
import type { Metadata } from 'next'
import ExportClient from './ExportClient'

export const metadata: Metadata = {
  title: 'Download certificate — GetCertified',
  robots: { index: false, follow: false },
}

export default function ExportPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0d1117] text-sm text-white/50">
          Loading export…
        </div>
      }
    >
      <ExportClient />
    </Suspense>
  )
}
