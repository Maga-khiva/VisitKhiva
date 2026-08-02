"use client"
import React, { useState } from 'react'
import BookingModal from './BookingModal'

export default function Hero() {
  const [open, setOpen] = useState(false)

  return (
    <section className="relative pt-8 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-lg overflow-hidden shadow-md" style={{ background: 'linear-gradient(90deg,#eef6ff, #fff5f0)'}}>
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
            <div className="w-full sm:w-2/3">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">천년의 역사가 숨쉬는 히바(Khiva), 가장 안전하고 편안한 프라이빗 투어 - VisitKhiva</h1>
              <p className="mt-3 text-gray-700">한국어 가능한 가이드와 VIP Urgench 공항 픽업을 제공합니다. 소수 인원 프라이빗 투어로 안전하고 편안한 여행을 약속합니다.</p>
              <div className="mt-4 flex gap-3">
                <a href={process.env.NEXT_PUBLIC_KAKAO_CHAT_URL || '#'} target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 bg-[#FEE500] text-black rounded-md font-medium">카카오톡 바로 문의</a>
                <button onClick={() => setOpen(true)} className="inline-flex items-center px-4 py-2 bg-[#0052CC] text-white rounded-md font-medium">투어 예약하기</button>
              </div>
            </div>
            <div className="w-full sm:w-1/3">
              <img src="https://images.pexels.com/photos/19473635/pexels-photo-19473635.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Ichan-Kala, Khiva" className="w-full h-40 object-cover rounded-md border" onError={(e) => e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E'} />
            </div>
          </div>
        </div>
      </div>
      <BookingModal isOpen={open} onClose={() => setOpen(false)} />
    </section>
  )
}
