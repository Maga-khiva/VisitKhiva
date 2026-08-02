"use client"
import React from 'react'

const services = [
  {
    title: 'VIP Airport Transfer',
    subtitle: 'Urgench ↔ Khiva 편안한 픽업',
    image: 'https://images.pexels.com/photos/17455630/pexels-photo-17455630.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Luxury airport transfer vehicle',
  },
  {
    title: '한국어 전용 가이드',
    subtitle: '경험 많은 한국어 가이드 제공',
    image: 'https://images.unsplash.com/photo-1728281522185-0c06b2d7a598?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Korean guide with tourists at historic site',
  },
  {
    title: '헤리티지 게스트하우스 & 호텔',
    subtitle: '전통 숙소 및 현대 호텔 예약 지원',
    image: 'https://q-xx.bstatic.com/xdata/images/hotel/608x352/889555559.webp?k=fabc3034b10dc1d6af61e9da6cbfb7cd2ac725abbdefd614f1160ad2304797f0&o=?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Uzbek heritage guesthouse courtyard',
  },
  {
    title: '한복 & 전통 의상 촬영 투어',
    subtitle: '전통 의상으로 기념 촬영',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMEYX_ks4T0pGb7861T9HoOUW-liYOA8ILJ-V0OqYLCKZVcoKsh39GXmw_&s=10?auto=format&fit=crop&w=1200&q=80',
    alt: 'Traditional costume photo tour',
  },
]

export default function Services() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {services.map((service) => (
        <div key={service.title} className="card overflow-hidden">
          <div className="relative h-48 w-full bg-gray-200">
            <img 
              src={service.image} 
              alt={service.alt} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E'
              }}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg text-[#0052CC]">{service.title}</h3>
            <p className="mt-2 text-gray-600">{service.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
