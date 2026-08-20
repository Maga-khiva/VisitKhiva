"use client"
import React, { useState } from 'react'
import { services, type Service } from '../data/services'
import BookingModal from './BookingModal'

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E'

function ServiceCard({
  service,
  lang,
  onBook,
}: {
  service: Service
  lang: 'kr' | 'en'
  onBook: (serviceTitle: string) => void
}) {
  const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_CHAT_URL || '#'
  const title = service.title[lang]
  const description = service.description[lang]

  return (
    <div className="card overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
        <img
          src={service.image}
          alt={service.alt}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_IMAGE
          }}
        />
        {service.badge && (
          <span className="absolute top-3 left-3 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-[#0052CC] shadow-sm">
            {service.badge[lang]}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-[#0052CC]">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>

        {service.highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {service.highlights.map((item) => (
              <li key={item.en} className="flex gap-2 text-sm text-gray-600">
                <span className="mt-0.5 text-[#0052CC]" aria-hidden>
                  ✓
                </span>
                <span>{item[lang]}</span>
              </li>
            ))}
          </ul>
        )}

        {service.pricingOptions && service.pricingOptions.length > 0 && (
          <div className="mt-4 space-y-2">
            {service.pricingOptions.map((option) => (
              <div key={option.amount} className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{option.label[lang]}</p>
                <p className="text-xl font-bold">{option.amount}</p>
              </div>
            ))}
          </div>
        )}

        {service.price && (
          <div className="mt-4">
            <p className="text-xl font-bold">{service.price}</p>
          </div>
        )}

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => onBook(service.title.kr)}
            className="inline-flex items-center justify-center px-4 py-2 bg-[#0052CC] text-white rounded-md font-medium"
          >
            {lang === 'en' ? 'Book Now' : '투어 예약하기'}
          </button>
          <a
            href={kakaoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#FEE500] text-black rounded-md font-medium"
          >
            {lang === 'en' ? 'KakaoTalk Contact' : '카카오톡 바로 문의'}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const [lang, setLang] = useState<'kr' | 'en'>('kr')
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string | undefined>()

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setLang('kr')}
          className={`text-sm ${lang === 'kr' ? 'font-semibold text-[#0052CC]' : 'text-gray-500'}`}
        >
          KR
        </button>
        <span className="text-gray-300">|</span>
        <button
          type="button"
          onClick={() => setLang('en')}
          className={`text-sm ${lang === 'en' ? 'font-semibold text-[#0052CC]' : 'text-gray-500'}`}
        >
          EN
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            lang={lang}
            onBook={(serviceTitle) => {
              setSelectedService(serviceTitle)
              setBookingOpen(true)
            }}
          />
        ))}
      </div>
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedService={selectedService}
      />
    </div>
  )
}
