import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PM営業テンプレートメーカー | ヅナ@ストチャ',
  description: '配信者のためのPM営業テンプレート自動生成ツール。シーン×相手×トーンを選ぶだけで、日英テンプレートが即完成。',
  openGraph: {
    title: 'PM営業テンプレートメーカー',
    description: 'シーン×相手×トーンを選ぶだけで、PM営業テンプレートが即完成',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
