'use client'

import { TimingInfo } from '@/types'

interface Props {
  timing: TimingInfo
}

export default function TimingGuide({ timing }: Props) {
  return (
    <div className="animate-slide-up">
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        <span>⏰</span>
        <span style={{ color: '#D4AF37' }}>送信タイミングガイド</span>
      </h3>
      <div
        className="p-4 rounded-xl grid gap-3"
        style={{ backgroundColor: '#111D2E', border: '1px solid rgba(212,175,55,0.25)' }}
      >
        <div className="flex items-start gap-3">
          <span className="text-green-400 text-lg">✅</span>
          <div>
            <div className="text-xs font-bold text-green-400 mb-0.5">ベストタイミング</div>
            <p className="text-sm" style={{ color: '#E0E4EA' }}>{timing.best}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-red-400 text-lg">⛔</span>
          <div>
            <div className="text-xs font-bold text-red-400 mb-0.5">避けるべき</div>
            <p className="text-sm" style={{ color: '#E0E4EA' }}>{timing.avoid}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-lg">💡</span>
          <div>
            <div className="text-xs font-bold text-blue-400 mb-0.5">ポイント</div>
            <p className="text-sm" style={{ color: '#E0E4EA' }}>{timing.note}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
