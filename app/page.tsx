import React from 'react'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Pricing from '../components/Pricing'
import NaverBlog from '../components/NaverBlog'

export default function Home() {
  return (
    <div>
      <Hero />
      <section id="services" className="max-w-3xl mx-auto py-8 px-4">
        <Services />
      </section>
      <section id="pricing" className="max-w-4xl mx-auto py-8 px-4">
        <Pricing />
      </section>
      <section id="blog" className="max-w-4xl mx-auto py-8 px-4">
        <NaverBlog />
      </section>
      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} VisitKhiva (비짓히바) • Naver Blog: visitkhiva
      </footer>
    </div>
  )
}
