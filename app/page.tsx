'use client'

import { useState } from 'react'
import { Scene, Target, Tone, Step, Template } from '@/types'
import { templates } from '@/data/templates'
import ProgressBar from '@/components/ProgressBar'
import StepScene from '@/components/StepScene'
import StepTarget from '@/components/StepTarget'
import StepTone from '@/components/StepTone'
import ResultView from '@/components/ResultView'

export default function Home() {
  const [step, setStep] = useState<Step>(1)
  const [scene, setScene] = useState<Scene | null>(null)
  const [target, setTarget] = useState<Target | null>(null)
  const [tone, setTone] = useState<Tone | null>(null)

  const handleSceneSelect = (s: Scene) => {
    setScene(s)
    setTimeout(() => setStep(2), 200)
  }

  const handleTargetSelect = (t: Target) => {
    setTarget(t)
    setTimeout(() => setStep(3), 200)
  }

  const handleToneSelect = (t: Tone) => {
    setTone(t)
    setTimeout(() => setStep(4), 200)
  }

  const handleReset = () => {
    setStep(1)
    setScene(null)
    setTarget(null)
    setTone(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    if (step === 2) { setStep(1); setTarget(null) }
    else if (step === 3) { setStep(2); setTone(null) }
    else if (step === 4) { setStep(3) }
  }

  const getTemplate = (): Template | null => {
    if (!scene || !target || !tone) return null
    return templates.find(t => t.scene === scene && t.target === target && t.tone === tone) || null
  }

  const currentTemplate = step === 4 ? getTemplate() : null

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0A1628' }}>
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
            PM営業テンプレートメーカー
          </h1>
          <p className="text-sm mt-1" style={{ color: '#B0B8C8' }}>
            3ステップで最適なPMテンプレを自動生成
          </p>
        </div>

        {/* Progress */}
        <ProgressBar currentStep={step} />

        {/* Back button */}
        {step > 1 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 mb-4 text-sm transition-opacity hover:opacity-80"
            style={{ color: '#B0B8C8' }}
          >
            ← 戻る
          </button>
        )}

        {/* Steps */}
        {step === 1 && <StepScene selected={scene} onSelect={handleSceneSelect} />}
        {step === 2 && <StepTarget selected={target} onSelect={handleTargetSelect} />}
        {step === 3 && <StepTone selected={tone} onSelect={handleToneSelect} />}
        {step === 4 && currentTemplate && <ResultView template={currentTemplate} onReset={handleReset} />}
      </div>
    </main>
  )
}
