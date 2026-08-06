import { NextResponse, NextRequest } from 'next/server'

// Force dynamic so Next.js does not serve static cached result on build
export const dynamic = 'force-dynamic'

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

export async function GET(request: NextRequest) {
  try {
    const id = process.env.NEXT_PUBLIC_NAVER_BLOG_ID || 'visitkhiva'
    const feedUrl = `https://rss.blog.naver.com/${id}.xml`
    const response = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      // ensure we're always fetching fresh feed data (no static caching)
      cache: 'no-store'
    })

    if (!response.ok) {
      return NextResponse.json({ items: [], error: `Failed to fetch RSS feed: ${response.status}` }, { status: response.status })
    }

    const xml = await response.text()
    // If caller requests raw XML (debug), return it directly for inspection
    try {
      const reqUrl = request ? new URL(request.url) : null
      const rawParam = reqUrl ? reqUrl.searchParams.get('raw') : null
      if (rawParam === '1' || rawParam === 'true') {
        console.log('Returning raw RSS XML for debugging; length:', xml.length)
        return new NextResponse(xml, { headers: { 'Content-Type': 'application/rss+xml', 'Cache-Control': 'no-store' } })
      }
    } catch (e) {
      // ignore URL parsing errors and continue
    }
    const itemMatches = Array.from(xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi))
    // log raw RSS items count for server-side diagnostics (Netlify function logs)
    console.log('Fetched raw Naver items count:', itemMatches.length)

    // map items (do not filter out posts missing thumbnails)
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
    // log mapped items count as well for diagnostics
    console.log('Mapped Naver items returned:', items.length)

    return NextResponse.json({ items }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    console.error('Naver blog RSS error:', err)
    return NextResponse.json({ items: [], error: String(err) }, { status: 500, headers: { 'Cache-Control': 'no-store' } })
  }
}
