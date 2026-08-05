"use client"
import React, { useEffect, useState } from 'react'

type Post = {
  title: string
  link: string
  isoDate?: string
  contentSnippet?: string
  image?: string
}

const placeholderImage = 'https://via.placeholder.com/180x140?text=NAVER+BLOG'

export default function NaverBlog() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    let mounted = true
    fetch('/api/naver-blog')
      .then((r) => r.json())
      .then((data) => {
        if (mounted && Array.isArray(data.items)) setPosts(data.items.slice(0, 3))
      })
      .catch(() => {})
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
                  src={p.image || placeholderImage}
                  alt={p.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = placeholderImage
                  }}
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-[11px] font-semibold mb-3">
                    NAVER BLOG
                  </div>
                  <h4 className="text-base font-semibold text-gray-900">{p.title}</h4>
                  <p className="text-xs text-gray-500 mt-2">
                    {p.isoDate ? new Date(p.isoDate).toLocaleDateString('ko-KR') : '날짜 정보 없음'}
                  </p>
                  <p className="text-sm text-gray-600 mt-3">{p.contentSnippet || '블로그 게시물 내용을 확인하려면 클릭하세요.'}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
