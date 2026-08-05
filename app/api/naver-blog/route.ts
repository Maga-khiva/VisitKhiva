import { NextResponse } from 'next/server'

function parseCDATA(value: string) {
  return value.replace(/^<!\[CDATA\[|\]\]>$/g, '').trim()
}

function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return match ? parseCDATA(match[1]) : ''
}

function stripHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeUrl(src: string): string {
  let url = src.trim()
  if (url.startsWith('//')) {
    url = `https:${url}`
  }
  if (/%[0-9A-Fa-f]{2}/.test(url)) {
    return url
  }
  try {
    return encodeURI(url)
  } catch {
    return url
  }
}

function extractImageFromHtml(html: string): string | undefined {
  const patterns = [
    /<img[^>]+src=["']([^"']*(?:blogthumb\.pstatic\.net|pstatic\.net|phinf)[^"']*)["']/i,
    /<img[^>]+src=(["']?)([^"'\s>]+)\1/i,
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match) {
      const src = match[1] || match[2]
      if (src && !src.includes('px.ad') && !src.includes('tracker') && !src.includes('1x1')) {
        const normalized = normalizeUrl(src)
        if (/^https?:\/\//.test(normalized)) {
          return normalized
        }
      }
    }
  }

  return undefined
}

export async function GET() {
  try {
    const id = process.env.NEXT_PUBLIC_NAVER_BLOG_ID || 'visitkhiva'
    const feedUrl = `https://rss.blog.naver.com/${id}.xml`
    const response = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (!response.ok) {
      return NextResponse.json({ items: [], error: `Failed to fetch RSS feed: ${response.status}` }, { status: response.status })
    }

    const xml = await response.text()
    const itemMatches = Array.from(xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi))
    const items = itemMatches.slice(0, 10).map((match) => {
      const itemXml = match[1]
      const title = extractTag(itemXml, 'title')
      const link = extractTag(itemXml, 'link')
      const description = extractTag(itemXml, 'description')
      const contentEncoded = extractTag(itemXml, 'content:encoded')
      const image = extractImageFromHtml(description) || extractImageFromHtml(contentEncoded)
      const contentSnippet = stripHtml(description || contentEncoded).slice(0, 220)

      return {
        title,
        link,
        isoDate: extractTag(itemXml, 'pubDate'),
        contentSnippet,
        image,
      }
    })

    return NextResponse.json({ items }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    console.error('Naver blog RSS error:', err)
    return NextResponse.json({ items: [], error: String(err) }, { status: 500, headers: { 'Cache-Control': 'no-store' } })
  }
}
