export interface ShareParams {
  name: string
  achievement: string
  theme: string
  variant: string
  /** Date line on the certificate; included so /view matches the studio output. */
  date?: string
}

/** Read-only viewer: certificate + download only. Query params mirror the studio state. */
export function buildShareUrl(params: ShareParams): string {
  if (typeof window === 'undefined') return ''
  const q = new URLSearchParams()
  if (params.name.trim()) q.set('name', params.name.trim())
  if (params.achievement.trim()) q.set('certified', params.achievement.trim())
  q.set('theme', params.theme)
  q.set('variant', params.variant)
  if (params.date?.trim()) q.set('date', params.date.trim())
  return `${window.location.origin}/view?${q.toString()}`
}

export function buildShareText(_name: string, achievement: string): string {
  return `Thrilled to announce I am now officially certified in "${achievement}" by the GetCertified Global Institute of Excellence. Hard work pays off. \uD83C\uDF93 #Certified #ProfessionalDevelopment #GetCertified`
}

export function getShareLinks(url: string, text: string) {
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)
  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    messenger: `https://www.facebook.com/dialog/send?link=${encodedUrl}&redirect_uri=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
  }
}
