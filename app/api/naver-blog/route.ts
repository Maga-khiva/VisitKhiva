import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

const parser = new Parser()

function extractImage(item: any): string | undefined {
  const imageSources = [
    item.enclosure?.url,
    item['media:content']?.url,
    item['media:content']?.['$']?.url,
    item['media:thumbnail']?.url,
    item['media:thumbnail']?.['$']?.url,
    item.thumbnail,
    item.image?.url,
    item['content:encoded'],
    item.content,
    item.description,
  ]

  for (const source of imageSources) {
    if (typeof source === 'string' && /^https?:\/\//.test(source)) {
      return source
    }
  }

  const html = String(item['content:encoded'] || item.content || item.description || '')
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? match[1] : undefined
}

export async function GET() {
  try {
    const id = process.env.NEXT_PUBLIC_NAVER_BLOG_ID || 'visitkhiva'
    const feedUrl = `https://rss.blog.naver.com/${id}.xml`
    const feed = await parser.parseURL(feedUrl)
    const items = (feed.items || []).map((it: any) => ({
      title: it.title || '',
      link: it.link || '',
      isoDate: it.isoDate || it.pubDate || '',
      contentSnippet: it.contentSnippet || it.content || '',
      image: extractImage(it),
    }))
    return NextResponse.json({ items })
  } catch (err) {
    return NextResponse.json({ items: [], error: String(err) }, { status: 500 })
  }
}
