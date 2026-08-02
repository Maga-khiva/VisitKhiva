import './globals.css'
import React from 'react'
import Header from '../components/Header'
import KakaoButton from '../components/KakaoButton'

export const metadata = {
  title: 'VisitKhiva | 히바 프라이빗 한국어 투어',
  description:
    '천년의 역사가 숨쉬는 히바(Khiva). 한국어 가이드, VIP 공항 픽업, 안전한 프라이빗 투어 - VisitKhiva',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'VisitKhiva | 히바 프라이빗 한국어 투어',
    description:
      '한국어 가이드와 VIP Urgench 공항 픽업을 제공하는 히바 전문 투어 플랫폼',
    url: 'https://visitkhiva.example',
    siteName: 'VisitKhiva',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'VisitKhiva (비짓히바)',
  url: 'https://visitkhiva.example',
  logo: 'https://visitkhiva.example/logo.png',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+998-xx-xxxx-xxx',
      contactType: 'customer service',
      areaServed: 'KR',
      availableLanguage: ['Korean', 'English', 'Russian'],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css" />
      </head>
      <body className="bg-[#F8F9FA] text-gray-900 antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <KakaoButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  )
}
