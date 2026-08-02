"use client"
import React from 'react'

export default function KakaoButton() {
  const url = process.env.NEXT_PUBLIC_KAKAO_CHAT_URL || '#'
  return (
    <a href={url} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full shadow-lg" style={{ background: '#FEE500' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-0">
        <path d="M12 2C6.48 2 2 5.58 2 10c0 2.38 1.45 4.55 3.84 6.03L5 22l6.22-2.53C12.78 19.6 13.38 19.66 14 19.66c5.52 0 10-3.58 10-8s-4.48-9-10-9z" fill="#191919" />
      </svg>
      <span className="text-sm font-medium text-black">카카오톡</span>
    </a>
  )
}
