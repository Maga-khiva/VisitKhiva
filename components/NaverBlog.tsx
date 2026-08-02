"use client"
import React, { useEffect, useState } from 'react'

type Post = {
  title: string
  link: string
  isoDate?: string
  contentSnippet?: string
}

export default function NaverBlog() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    let mounted = true
    fetch('/api/naver-blog')
      .then((r) => r.json())
      .then((data) => {
        if (mounted && Array.isArray(data.items)) setPosts(data.items.slice(0, 6))
      })
      .catch(() => {})
    return () => { mounted = false }
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">블로그 최신글</h3>
        <a href={`https://blog.naver.com/${process.env.NEXT_PUBLIC_NAVER_BLOG_ID || 'visitkhiva'}`} target="_blank" rel="noreferrer" className="text-sm text-[#0052CC]">더보기</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((p) => (
          <a key={p.link} href={p.link} target="_blank" rel="noreferrer" className="card">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-semibold">NAVER BLOG</div>
              <div>
                <div className="font-medium text-sm text-gray-800">{p.title}</div>
                <div className="text-xs text-gray-500 mt-1">{p.isoDate ? new Date(p.isoDate).toLocaleDateString('ko-KR') : ''}</div>
                <p className="text-sm text-gray-600 mt-2">{p.contentSnippet}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
