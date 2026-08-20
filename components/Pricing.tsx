import React from 'react'

const priceData = [
  { name: 'VIP Airport Transfer', usd: 30, note: 'Urgench ↔ Khiva' },
  { name: '한국어 가이드 (Half day)', usd: 40, note: '약 4시간' },
  { name: '헤리티지 게스트하우스', usd: 40, note: '1박 평균' },
  { name: '한복 촬영 투어', usd: 35, note: '의상 포함' },
  { name: '사막 요새 프라이빗 투어', usd: 65, note: 'Vehicle Only · 가이드 포함 $100' },
  { name: '히바 → 부하라 프라이빗 이동', usd: 180, note: '차량당 (최대 3–4인) ~$220' },
]

function toKRW(usd: number) {
  const rate = 1360 // example rate; show approximate
  return Math.round(usd * rate).toLocaleString('ko-KR')
}

export default function Pricing() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {priceData.map((p) => (
        <div key={p.name} className="card">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-lg">{p.name}</h4>
              <p className="text-sm text-gray-500">{p.note}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">${p.usd}</div>
              <div className="text-sm text-gray-500">약 {toKRW(p.usd)}원</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
