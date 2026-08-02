import { NextResponse } from 'next/server'

type Body = {
  name?: string
  kakaoId?: string
  service?: string
  date?: string
  message?: string
}

export async function POST(req: Request) {
  try {
    const body: Body = await req.json()
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json({ ok: false, error: 'Telegram config missing' }, { status: 500 })
    }

    const text = `New booking request from VisitKhiva:\n성함: ${body.name || '-'}\n카카오톡: ${body.kakaoId || '-'}\n서비스: ${body.service || '-'}\n날짜: ${body.date || '-'}\n메모: ${body.message || '-'} `

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ ok: false, error: text }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
