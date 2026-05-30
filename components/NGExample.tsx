'use client'

import { NGExample as NGExampleType } from '@/types'

interface Props {
  examples: NGExampleType[]
}

export default function NGExample({ examples }: Props) {
  return (
    <div className="animate-slide-up">
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        <span>🚫</span>
        <span style={{ color: '#EF4444' }}>NG例 — こう書くと返信率が下がる</span>
      </h3>
      <div className="grid gap-3">
        {examples.map((ex, i) => (
          <div
            key={i}
            className="p-4 rounded-xl"
            style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
          >
            <p className="text-sm mb-2 font-medium" style={{ color: '#FCA5A5' }}>
              「{ex.text}」
            </p>
            <p className="text-xs" style={{ color: '#B0B8C8' }}>
              → {ex.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
