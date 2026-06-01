export type Scene = 'new_follower' | 'regular' | 'dormant' | 'whale' | 'first_tip'
export type Target = 'english' | 'japanese' | 'chatty' | 'silent'
export type Tone = 'sweet' | 'mature' | 'energetic' | 'mysterious'

export interface TemplateTexts {
  short: string
  medium: string
  long: string
}

export interface NGExample {
  text: string
  reason: string
}

export interface TimingInfo {
  best: string
  avoid: string
  note: string
}

export interface Template {
  id: string
  scene: Scene
  target: Target
  tone: Tone
  japanese: TemplateTexts
  english: TemplateTexts
  ngExamples: NGExample[]
  timing: TimingInfo
  proTips: string[]
}

export interface SelectionOption<T extends string> {
  value: T
  label: string
  icon: string
  description: string
}

export type Step = 1 | 2 | 3 | 4
