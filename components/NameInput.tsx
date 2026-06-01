'use client'

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function NameInput({ value, onChange }: Props) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-bold mb-2" style={{ color: '#D4AF37' }}>
        相手のユーザー名（テンプレに自動反映）
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="例: John, たかし, Mike123"
        className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all duration-200 focus:ring-2"
        style={{
          backgroundColor: '#111D2E',
          border: '2px solid rgba(212,175,55,0.25)',
          color: '#FFFFFF',
          minHeight: '48px',
        }}
      />
      <p className="text-xs mt-1.5" style={{ color: '#B0B8C8' }}>
        空欄の場合は「あなた」「you」で出力されます
      </p>
    </div>
  )
}
