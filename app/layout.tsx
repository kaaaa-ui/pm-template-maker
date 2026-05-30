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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover' as const,
  themeColor: '#0A1628',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  )
}
