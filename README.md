# VisitKhiva

**VisitKhiva** is a Korean-focused tourism platform for Khiva and Khorezm, built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Overview

This project is a mobile-first landing page and booking experience designed for South Korean travelers. It includes:

- Sticky navigation and responsive layout
- Hero section with Korean copy and CTA actions
- Service cards with visual imagery for VIP transfers, Korean guides, heritage guesthouses, and photo tours
- Transparent pricing section with USD + KRW equivalents
- Booking modal that submits requests to a Telegram bot via API route
- Naver Blog RSS feed integration for content previews
- Floating KakaoTalk contact button
- Naver-friendly SEO metadata and sitemap/robots support

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Telegram Bot API integration
- RSS parsing for Naver Blog feed

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Maga-khiva/VisitKhiva.git
cd VisitKhiva
```

2. Install dependencies:

```bash
npm install
```

3. Create an environment file from the example:

```bash
cp .env.example .env.local
```

4. Update `.env.local` with your real values:

```env
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN_HERE
TELEGRAM_CHAT_ID=YOUR_TELEGRAM_CHAT_ID_HERE
NEXT_PUBLIC_NAVER_BLOG_ID=visitkhiva
NEXT_PUBLIC_KAKAO_CHAT_URL=https://open.kakao.com/o/yourchatlink
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000` to view the app.

## Build

```bash
npm run build
```

## GitHub Push Preparation

The project is initialized as a git repository. To push the local branch to GitHub:

```bash
git remote add origin https://github.com/Maga-khiva/VisitKhiva.git
git branch -M main
git push -u origin main
```

## Notes

- Keep `.env.local` out of version control.
- If you change image URLs in `components/Services.tsx`, use direct image asset URLs.
- The Telegram booking integration is handled by `app/api/booking/route.ts`.
- The Naver Blog feed is fetched from `app/api/naver-blog/route.ts`.
