import { Suspense } from 'react'
import type { Metadata } from 'next'
import ViewClient from './ViewClient'

export const metadata: Metadata = {
  title: 'Certificate — Certify Pro Max',
  robots: { index: false, follow: false },
}

export default function ViewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-app-muted">
          Loading certificate…
        </div>
      }
    >
      <ViewClient />
    </Suspense>
  )
}
