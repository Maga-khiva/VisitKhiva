import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

const parser = new Parser()

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
    }))
    return NextResponse.json({ items })
  } catch (err) {
    return NextResponse.json({ items: [], error: String(err) }, { status: 500 })
  }
}
