import { NextResponse } from 'next/server'
import Parser from 'rss-parser'
import { EventEmitter } from 'events'

// Suppress MaxListenersExceeded warning for rss-parser streams
// This is a known issue with xml2js streaming in rss-parser
if (typeof process !== 'undefined') {
  const originalWarning = console.warn
  const warningSuppressed = new Set<string>()
  console.warn = (...args: any[]) => {
    const msg = String(args[0])
    if (msg.includes('MaxListenersExceededWarning') || msg.includes('setMaxListeners')) {
      if (!warningSuppressed.has(msg)) {
        warningSuppressed.add(msg)
        return
      }
      return
    }
    originalWarning.apply(console, args)
  }
}

// Set global max listeners for EventEmitter to prevent warnings during parsing
if (typeof EventEmitter !== 'undefined') {
  EventEmitter.defaultMaxListeners = 20
}

// Create parser instance with listener limits
const createParser = () => {
  const p = new Parser()
  // Prevent MaxListenersExceeded warning by setting appropriate limit
  if ((p as any).setMaxListeners) {
    try {
      (p as any).setMaxListeners(20)
    } catch {}
  }
  return p
}

async function extractImageFromBlogPost(url: string): Promise<string | undefined> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    if (timeoutId) clearTimeout(timeoutId)
    if (!response.ok) return undefined
    
    const html = await response.text()
    
    // Try multiple patterns to extract images from Naver blog
    const patterns = [
      // Naver blog post content image
      /<img[^>]+src=["']([^"']*(?:phinf|timthumb|resize)\.pstatic\.net[^"']*)["']/i,
      // General image in content
      /<img[^>]+class=["'](?:_img[^"']*)["'][^>]+src=["']([^"']+)["']/i,
      // First non-tracking image
      /<img[^>]+src=["']([^"']+)["'][^>]*(?!tracking|pixel|1x1)/i,
      // Fallback: any img src
      /<img[^>]+src=["']([^"']+)["']/i,
    ]
    
    for (const pattern of patterns) {
      const match = html.match(pattern)
      if (match && match[1]) {
        const src = match[1]
        // Filter out tracking and small images
        if (!src.includes('px.ad') && !src.includes('tracker') && !src.includes('1x1')) {
          return src
        }
      }
    }
    
    return undefined
  } catch (e) {
    console.error('Image extraction error:', e)
    return undefined
  }
}

function extractImage(item: any): string | undefined {
  // Try to extract from various RSS item fields (different RSS feed formats)
  const candidates = [
    // Naver-specific fields
    item['naver:image'],
    item['naver:image']?.url,
    item['naver:thumbnail'],
    // Standard media fields
    item.enclosure?.url,
    item['media:content']?.url,
    item['media:content']?.['$']?.url,
    item['media:thumbnail']?.url,
    item['media:thumbnail']?.['$']?.url,
    item['media:thumbnail']?.[0]?.['$']?.url,
    // Image fields
    item.thumbnail,
    item.image,
    item.image?.url,
    item['content:encoded'],
    item.content,
    item.description,
  ]

  // Check each candidate for valid image URLs
  for (const source of candidates) {
    if (typeof source === 'string' && /^https?:\/\//.test(source)) {
      // Filter out tracking pixels and small images
      if (!source.includes('px.ad') && !source.includes('tracker') && !source.includes('1x1')) {
        // Prioritize Pstatic URLs (Naver's CDN for real images)
        if (source.includes('pstatic.net') || source.includes('phinf')) {
          return source
        }
      }
    }
  }

  // If no direct URL found, try parsing HTML content for images
  const html = String(item['content:encoded'] || item.content || item.description || '')
  if (html) {
    // Try to extract first real image from HTML content
    const patterns = [
      /<img[^>]+src=["']([^"']*(?:phinf|pstatic)\.naver\.net[^"']*)["']/i,
      /<img[^>]+class=["'][^"']*_img[^"']*["'][^>]+src=["']([^"']+)["']/i,
      /<img[^>]+src=["']([^"']+)["']/i,
    ]

    for (const pattern of patterns) {
      const match = html.match(pattern)
      if (match && match[1]) {
        const src = match[1]
        if (!src.includes('px.ad') && !src.includes('tracker') && !src.includes('1x1')) {
          return src
        }
      }
    }
  }

  return undefined
}

export async function GET() {
  let parser: Parser | null = null
  try {
    const id = process.env.NEXT_PUBLIC_NAVER_BLOG_ID || 'visitkhiva'
    const feedUrl = `https://rss.blog.naver.com/${id}.xml`
    
    // Create fresh parser for each request
    parser = createParser()
    const feed = await parser.parseURL(feedUrl)
    
    // Extract images from RSS and fetch post content for missing images
    const items = await Promise.all((feed.items || []).map(async (it: any) => {
      let image = extractImage(it)
      // If no image found in RSS, try fetching from actual blog post
      if (!image && it.link) {
        image = await extractImageFromBlogPost(it.link)
      }
      return {
        title: it.title || '',
        link: it.link || '',
        isoDate: it.isoDate || it.pubDate || '',
        contentSnippet: it.contentSnippet || it.content || '',
        image: image,
      }
    }))
    
    return NextResponse.json({ items })
  } catch (err) {
    console.error('Naver blog RSS error:', err)
    return NextResponse.json({ items: [], error: String(err) }, { status: 500 })
  } finally {
    // Clean up parser to prevent listener accumulation
    if (parser) {
      try {
        // Remove all listeners from the parser and its internal streams
        if ((parser as any).removeAllListeners) {
          (parser as any).removeAllListeners()
        }
        if ((parser as any).stream) {
          const stream = (parser as any).stream
          if (stream?.removeAllListeners) stream.removeAllListeners()
          if (stream?.destroy) stream.destroy()
        }
      } catch (e) {
        // Silently ignore cleanup errors
      }
    }
  }
}
