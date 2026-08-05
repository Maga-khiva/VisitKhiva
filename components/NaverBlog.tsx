"use client"
import React, { useEffect, useState } from 'react'

type Post = {
  title: string
  link: string
  isoDate?: string
  contentSnippet?: string
  image?: string
}

// Reliable Unsplash fallback (Khiva / Uzbekistan heritage)
const fallbackImage = 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=500&auto=format&fit=crop'

export default function NaverBlog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    
    fetch('/api/naver-blog')
      .then((r) => r.json())
      .then((data) => {
        if (mounted) {
          const items = Array.isArray(data.items) ? data.items.slice(0, 3) : []
          setPosts(items)
          setLoading(false)
        }
      })
      .catch(() => {
        if (mounted) {
          setPosts([])
          setLoading(false)
        }
      })
    
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">블로그 최신글</h3>
        <a
          href={`https://blog.naver.com/${process.env.NEXT_PUBLIC_NAVER_BLOG_ID || 'visitkhiva'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#0052CC]"
        >
          더보기
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl shadow-sm bg-gray-100 animate-pulse"
              style={{ height: '350px' }}
            />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          블로그 게시물을 불러올 수 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <a
              key={p.link}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-gray-200 rounded-2xl shadow-sm transition-all hover:border-blue-500 hover:shadow-md bg-white overflow-hidden"
            >
              <div className="flex h-full flex-col">
                <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                  <img
                    src={p.image || fallbackImage}
                    alt={p.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const t = e.currentTarget as HTMLImageElement
                      // Only replace with fallback if not already using fallback
                      if (t.src && !t.src.includes('images.unsplash.com/photo-1584551246679-0daf3d275d0f')) {
                        t.onerror = null
                        t.src = fallbackImage
                      }
                    }}
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-[11px] font-semibold mb-3">
                      NAVER BLOG
                    </div>
                    <h4 className="text-base font-semibold text-gray-900 line-clamp-2">{p.title}</h4>
                    <p className="text-xs text-gray-500 mt-2">
                      {p.isoDate ? new Date(p.isoDate).toLocaleDateString('ko-KR') : '날짜 정보 없음'}
                    </p>
                    <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                      {p.contentSnippet || '블로그 게시물 내용을 확인하려면 클릭하세요.'}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
