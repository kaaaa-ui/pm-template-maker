'use client'

import { useState } from 'react'

interface Props {
  label: string
  text: string
}

export default function TemplateCard({ label, text }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className="p-4 rounded-xl relative"
      style={{ backgroundColor: '#111D2E', border: '1px solid rgba(212,175,55,0.25)' }}
    >
      <div className="text-xs font-bold mb-2" style={{ color: '#D4AF37' }}>
        {label}
      </div>
      <p className="text-sm leading-relaxed mb-3 whitespace-pre-wrap" style={{ color: '#E0E4EA' }}>
        {text}
      </p>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 active:scale-95"
        style={{
          backgroundColor: copied ? '#22C55E' : '#1E3A5F',
          color: copied ? '#fff' : '#D4AF37',
          border: copied ? 'none' : '1px solid rgba(212,175,55,0.4)',
        }}
      >
        {copied ? (
          <span className="animate-checkmark">✓ コピー完了</span>
        ) : (
          <>📋 コピー</>
        )}
      </button>
    </div>
  )
}
