'use client'

import { Scene, SelectionOption } from '@/types'

const scenes: SelectionOption<Scene>[] = [
  { value: 'new_follower', label: '新規フォロワー', icon: '🆕', description: '初めてフォローしてくれた人' },
  { value: 'regular', label: '常連', icon: '🔄', description: '毎回来てくれる人' },
  { value: 'dormant', label: '休眠客', icon: '💤', description: '最近来なくなった人' },
  { value: 'whale', label: '太客', icon: '💎', description: '高額チップをくれた人' },
  { value: 'first_tip', label: '初チップ後', icon: '🎁', description: '初めてチップをもらった直後' },
]

interface Props {
  selected: Scene | null
  onSelect: (scene: Scene) => void
}

export default function StepScene({ selected, onSelect }: Props) {
  return (
    <div className="animate-slide-in">
      <h2 className="text-xl font-bold mb-2 text-center" style={{ color: '#D4AF37' }}>
        Step 1: シーンを選択
      </h2>
      <p className="text-center mb-6" style={{ color: '#B0B8C8' }}>
        どんな相手にPMを送る？
      </p>
      <div className="grid gap-3">
        {scenes.map((scene) => (
          <button
            key={scene.value}
            onClick={() => onSelect(scene.value)}
            className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left"
            style={{
              backgroundColor: selected === scene.value ? '#1E3A5F' : '#111D2E',
              border: selected === scene.value ? '2px solid #D4AF37' : '2px solid rgba(212,175,55,0.25)',
            }}
          >
            <span className="text-3xl">{scene.icon}</span>
            <div>
              <div className="font-bold text-white">{scene.label}</div>
              <div className="text-sm" style={{ color: '#B0B8C8' }}>{scene.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
