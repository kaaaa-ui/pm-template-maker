'use client'

export default function CTA() {
  return (
    <div className="animate-slide-up">
      <div
        className="p-6 rounded-xl text-center"
        style={{
          background: 'linear-gradient(135deg, #1E3A5F 0%, #0A1628 100%)',
          border: '2px solid #D4AF37',
        }}
      >
        <h3 className="text-lg font-bold mb-2" style={{ color: '#D4AF37' }}>
          もっと詳しいテンプレが欲しい？
        </h3>
        <p className="text-sm mb-4" style={{ color: '#B0B8C8' }}>
          プロ用PMテンプレ集（シーン別40パターン＋返信率UP裏技）を
          <br />
          ヅナのDMで無料配布中
        </p>
        <a
          href="https://x.com/S84nti98mnA18"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#D4AF37', color: '#0A1628' }}
        >
          𝕏 ヅナにDMする
        </a>
        <p className="text-xs mt-3" style={{ color: '#B0B8C8' }}>
          @S84nti98mnA18 ← フォロー＋DM「テンプレ」で送付
        </p>
      </div>
    </div>
  )
}
