"use client"
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="text-2xl font-semibold text-[#0052CC]">VisitKhiva</div>
          <div className="text-sm text-gray-600">비짓히바</div>
        </Link>
        <nav className="hidden sm:flex items-center gap-6">
          <a href="#services" className="text-gray-700 hover:text-[#0052CC]">서비스</a>
          <a href="#pricing" className="text-gray-700 hover:text-[#0052CC]">요금안내</a>
          <a href="https://blog.naver.com/visitkhiva" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-[#0052CC]">블로그</a>
          <a href="#blog" className="text-gray-700 hover:text-[#0052CC]">FAQ</a>
          <a
            href={process.env.NEXT_PUBLIC_KAKAO_CHAT_URL || '#'}
            className="ml-2 inline-flex items-center px-3 py-2 bg-[#0052CC] text-white rounded-md text-sm"
            target="_blank"
            rel="noreferrer"
          >
            한국어 문의
          </a>
        </nav>
        <div className="sm:hidden">
          <a href={process.env.NEXT_PUBLIC_KAKAO_CHAT_URL || '#'} className="inline-flex items-center px-3 py-2 bg-[#0052CC] text-white rounded-md text-sm">문의</a>
        </div>
      </div>
    </header>
  )
}
