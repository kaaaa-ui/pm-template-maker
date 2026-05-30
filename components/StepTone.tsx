'use client'

import { Tone, SelectionOption } from '@/types'

const tones: SelectionOption<Tone>[] = [
  { value: 'sweet', label: '甘え系', icon: '🩷', description: '可愛く甘える' },
  { value: 'mature', label: 'お姉さん系', icon: '👩', description: '落ち着いた大人の余裕' },
  { value: 'energetic', label: '元気系', icon: '⚡', description: '明るくハイテンション' },
  { value: 'mysterious', label: 'ミステリアス系', icon: '🌙', description: 'クールで気になる' },
]

interface Props {
  selected: Tone | null
  onSelect: (tone: Tone) => void
}

export default function StepTone({ selected, onSelect }: Props) {
  return (
    <div className="animate-slide-in">
      <h2 className="text-xl font-bold mb-2 text-center" style={{ color: '#D4AF37' }}>
        Step 3: トーンを選択
      </h2>
      <p className="text-center mb-6" style={{ color: '#B0B8C8' }}>
        どんな雰囲気で送る？
      </p>
      <div className="grid grid-cols-2 gap-3">
        {tones.map((tone) => (
          <button
            key={tone.value}
            onClick={() => onSelect(tone.value)}
            className="flex flex-col items-center gap-2 p-5 rounded-xl transition-all duration-200"
            style={{
              backgroundColor: selected === tone.value ? '#1E3A5F' : '#111D2E',
              border: selected === tone.value ? '2px solid #D4AF37' : '2px solid rgba(212,175,55,0.25)',
            }}
          >
            <span className="text-3xl">{tone.icon}</span>
            <div className="font-bold text-white text-sm">{tone.label}</div>
            <div className="text-xs text-center" style={{ color: '#B0B8C8' }}>{tone.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
