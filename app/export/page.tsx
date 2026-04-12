import { Suspense } from 'react'
import type { Metadata } from 'next'
import ExportClient from './ExportClient'

export const metadata: Metadata = {
  title: 'Download certificate — Certify Pro Max',
  robots: { index: false, follow: false },
}

export default function ExportPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-app-muted">
          Loading export…
        </div>
      }
    >
      <ExportClient />
    </Suspense>
  )
}
