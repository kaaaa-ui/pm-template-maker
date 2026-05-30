'use client'

import { Target, SelectionOption } from '@/types'

const targets: SelectionOption<Target>[] = [
  { value: 'english', label: '英語圏', icon: '🇺🇸', description: '英語でコミュニケーション' },
  { value: 'japanese', label: '日本人', icon: '🇯🇵', description: '日本語でやりとり' },
  { value: 'chatty', label: 'よくチャットする', icon: '💬', description: 'チャットで積極的に話す人' },
  { value: 'silent', label: '無言勢', icon: '🤫', description: 'チャットせずに見てるだけ' },
]

interface Props {
  selected: Target | null
  onSelect: (target: Target) => void
}

export default function StepTarget({ selected, onSelect }: Props) {
  return (
    <div className="animate-slide-in">
      <h2 className="text-xl font-bold mb-2 text-center" style={{ color: '#D4AF37' }}>
        Step 2: 相手の特徴
      </h2>
      <p className="text-center mb-6" style={{ color: '#B0B8C8' }}>
        相手はどんなタイプ？
      </p>
      <div className="grid grid-cols-2 gap-3">
        {targets.map((target) => (
          <button
            key={target.value}
            onClick={() => onSelect(target.value)}
            className="flex flex-col items-center gap-2 p-5 rounded-xl transition-all duration-200 active:scale-[0.97]"
            style={{
              backgroundColor: selected === target.value ? '#1E3A5F' : '#111D2E',
              border: selected === target.value ? '2px solid #D4AF37' : '2px solid rgba(212,175,55,0.25)',
              minHeight: '120px',
            }}
          >
            <span className="text-3xl">{target.icon}</span>
            <div className="font-bold text-white text-sm">{target.label}</div>
            <div className="text-xs text-center" style={{ color: '#B0B8C8' }}>{target.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
