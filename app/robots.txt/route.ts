import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://visitkhiva.example'
  const txt = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`
  return new NextResponse(txt, { headers: { 'content-type': 'text/plain' } })
}
