"use client"
import React, { useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState('')
  const [kakao, setKakao] = useState('')
  const [service, setService] = useState('VIP Airport Transfer')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null)

  if (!isOpen) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatusMessage(null)
    setStatusType(null)

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, kakaoId: kakao, service, date, message }),
      })
      const data = await res.json()
      const isSuccess = data.success === true || data.ok === true

      if (isSuccess) {
        setStatusType('success')
        setStatusMessage('예약 문의가 완료되었습니다! 빠르게 연락드리겠습니다.')
        setName('')
        setKakao('')
        setDate('')
        setMessage('')

        setTimeout(() => {
          onClose()
          setStatusMessage(null)
          setStatusType(null)
        }, 2500)
      } else {
        setStatusType('error')
        setStatusMessage('전송에 실패했습니다. 다시 시도해 주세요.')
      }
    } catch (err) {
      setStatusType('error')
      setStatusMessage('전송에 실패했습니다. 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold">투어 예약 문의</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm text-gray-700">성함</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">카카오톡 아이디</label>
            <input value={kakao} onChange={(e) => setKakao(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">서비스 선택</label>
            <select value={service} onChange={(e) => setService(e.target.value)} className="mt-1 w-full border rounded px-3 py-2">
              <option>VIP Airport Transfer</option>
              <option>한국어 전용 가이드</option>
              <option>헤리티지 게스트하우스</option>
              <option>한복 촬영 투어</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700">여행 날짜</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">메모</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">취소</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded text-white bg-[#0052CC] disabled:opacity-70">
              {loading ? '전송중...' : '전송'}
            </button>
          </div>
          {statusMessage && (
            <div className={`text-sm mt-2 ${statusType === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {statusMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
