import { Suspense } from 'react'
import type { Metadata } from 'next'
import ViewClient from './ViewClient'

export const metadata: Metadata = {
  title: 'Certificate — GetCertified',
  robots: { index: false, follow: false },
}

export default function ViewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0d1117] text-sm text-white/40">
          Loading certificate…
        </div>
      }
    >
      <ViewClient />
    </Suspense>
  )
}
