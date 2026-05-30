'use client'

import { Step } from '@/types'

const stepLabels = ['シーン', '相手', 'トーン', '結果']

export default function ProgressBar({ currentStep }: { currentStep: Step }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {stepLabels.map((label, i) => {
        const stepNum = (i + 1) as Step
        const isActive = stepNum === currentStep
        const isCompleted = stepNum < currentStep
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  backgroundColor: isActive || isCompleted ? '#D4AF37' : '#1E3A5F',
                  color: isActive || isCompleted ? '#0A1628' : '#B0B8C8',
                }}
              >
                {isCompleted ? '✓' : stepNum}
              </div>
              <span
                className="text-xs transition-colors duration-300"
                style={{ color: isActive ? '#D4AF37' : '#B0B8C8' }}
              >
                {label}
              </span>
            </div>
            {i < stepLabels.length - 1 && (
              <div
                className="w-8 h-0.5 mb-5 transition-colors duration-300"
                style={{ backgroundColor: stepNum < currentStep ? '#D4AF37' : '#1E3A5F' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
