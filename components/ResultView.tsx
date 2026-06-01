'use client'

import { Template } from '@/types'
import TemplateCard from './TemplateCard'
import NGExample from './NGExample'
import TimingGuide from './TimingGuide'
import CTA from './CTA'

const sceneLabels: Record<string, string> = {
  new_follower: '🆕 新規フォロワー',
  regular: '🔄 常連',
  dormant: '💤 休眠客',
  whale: '💎 太客',
  first_tip: '🎁 初チップ後',
}

const targetLabels: Record<string, string> = {
  english: '🇺🇸 英語圏',
  japanese: '🇯🇵 日本人',
  chatty: '💬 よくチャットする',
  silent: '🤫 無言勢',
}

const toneLabels: Record<string, string> = {
  sweet: '🩷 甘え系',
  mature: '👩 お姉さん系',
  energetic: '⚡ 元気系',
  mysterious: '🌙 ミステリアス系',
}

interface Props {
  template: Template
  onReset: () => void
  userName: string
}

function replaceName(text: string, userName: string, isEnglish: boolean): string {
  const jaDefault = 'あなた'
  const enDefault = 'you'
  const name = userName.trim()

  if (name) {
    return text.replace(/\{name\}/g, name)
  }
  return text.replace(/\{name\}さん/g, isEnglish ? enDefault : `${jaDefault}`).replace(/\{name\}/g, isEnglish ? enDefault : jaDefault)
}

export default function ResultView({ template, onReset, userName }: Props) {
  const rJa = (t: string) => replaceName(t, userName, false)
  const rEn = (t: string) => replaceName(t, userName, true)

  return (
    <div className="animate-slide-in space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-3" style={{ color: '#D4AF37' }}>
          あなた専用テンプレート
        </h2>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#1E3A5F', color: '#D4AF37' }}>
            {sceneLabels[template.scene]}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#1E3A5F', color: '#D4AF37' }}>
            {targetLabels[template.target]}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#1E3A5F', color: '#D4AF37' }}>
            {toneLabels[template.tone]}
          </span>
        </div>
        {userName.trim() && (
          <p className="text-sm" style={{ color: '#22C55E' }}>
            ✓ 「{userName.trim()}」でテンプレートに名前反映済み
          </p>
        )}
      </div>

      {/* Japanese Templates */}
      <div>
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span>🇯🇵</span>
          <span>日本語テンプレート</span>
        </h3>
        <div className="grid gap-3">
          <TemplateCard label="パターンA（短め・カジュアル）" text={rJa(template.japanese.short)} />
          <TemplateCard label="パターンB（中くらい・丁寧）" text={rJa(template.japanese.medium)} />
          <TemplateCard label="パターンC（長め・特別感）" text={rJa(template.japanese.long)} />
        </div>
      </div>

      {/* English Templates */}
      <div>
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span>🇺🇸</span>
          <span>英語テンプレート</span>
        </h3>
        <div className="grid gap-3">
          <TemplateCard label="Pattern A (Short & Casual)" text={rEn(template.english.short)} />
          <TemplateCard label="Pattern B (Medium & Polite)" text={rEn(template.english.medium)} />
          <TemplateCard label="Pattern C (Long & Special)" text={rEn(template.english.long)} />
        </div>
      </div>

      {/* NG Examples */}
      <NGExample examples={template.ngExamples} />

      {/* Timing Guide */}
      <TimingGuide timing={template.timing} />

      {/* Pro Tips */}
      <div className="animate-slide-up">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span>🎯</span>
          <span style={{ color: '#D4AF37' }}>返信率UPのコツ</span>
        </h3>
        <div
          className="p-4 rounded-xl grid gap-2"
          style={{ backgroundColor: '#111D2E', border: '1px solid rgba(212,175,55,0.25)' }}
        >
          {template.proTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-sm" style={{ color: '#D4AF37' }}>•</span>
              <p className="text-sm" style={{ color: '#E0E4EA' }}>{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <CTA />

      {/* Reset Button */}
      <div className="text-center pt-4 pb-8">
        <button
          onClick={onReset}
          className="px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:opacity-80 active:scale-95"
          style={{ backgroundColor: '#1E3A5F', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.4)' }}
        >
          🔄 別のパターンを試す
        </button>
      </div>
    </div>
  )
}
