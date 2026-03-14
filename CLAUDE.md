# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Monorepo for a Next.js + Strapi headless CMS application (натяжные потолки business site). Russian language UI throughout.

- **Frontend**: `apps/client/` — Next.js 16.1.6, React 19.2.3, TypeScript, Tailwind CSS 4
- **Backend**: `apps/backend/` — Strapi 5.39.0 (headless CMS)
- **Database**: PostgreSQL 16
- **Proxy**: Nginx 1.27 (routes `/` → client, `/api/` and `/admin/` → Strapi)

## Commands

### Docker (primary workflow)
```bash
make up          # docker compose up --build -d
make down        # stop all
make restart     # restart all
make logs        # view logs
make client      # shell into client container
make backend     # shell into backend container
make clean       # remove volumes and uploads
```

### Client (inside apps/client/)
```bash
npm run dev      # dev server on :3000
npm run build    # production build
npm run lint     # eslint
npx tsc --noEmit # type check
```

### Backend (inside apps/backend/)
```bash
npm run develop  # dev server on :1337
npm run build    # production build
```

## Architecture

### Data Flow
```
Nginx (:80) → Next.js (:3000) → Strapi API (:1337) → PostgreSQL (:5432)
```

### Strapi Content Types (singleType)
- **Global** (`api::global.global`): siteName, phone, logo, favicon, header (component), footer (component)
- **HomePage** (`api::home-page.home-page`): title, subtitle, seo, hero, partners (repeatable)

Controllers in `apps/backend/src/api/*/controllers/` override `find()` to inject deep populate (Strapi 5's `populate=*` only goes 1 level deep for components).

### Strapi Components
- `blocks/`: hero, partners-brands, about-company, advantages, faq-preview, contact-info, reviews-preview
- `layout/`: header (menuItems + ctaText/ctaLink), footer (menuItems + socialLinks + copyright)
- `shared/`: seo, nav-item, social-link

### Frontend Structure
- `app/` — Next.js App Router pages (home, about, catalog, contacts, api/callback)
- `src/components/` — reusable React components
- `src/layout/` — Header and Footer
- `src/lib/strapi.ts` — centralized Strapi fetch wrapper (Bearer token auth, 60s ISR)
- `src/providers/` — React Context (modal system)
- `src/types/strapi.ts` — TypeScript types matching Strapi schemas

### Key Patterns
- **Server vs Client components**: most components are server-side. Client components use `"use client"` and are kept minimal (callback-button.tsx as bridge for server components to trigger modals).
- **Strapi fetch**: `fetchStrapi<T>(path)` in `src/lib/strapi.ts`. Uses `STRAPI_API_URL` (server-side, resolves to `http://backend:1337` in Docker) with Bearer token from `STRAPI_API_TOKEN`.
- **CMS-driven CTAs**: links set to `#callback` or `#lead-form` in Strapi render as `CallbackButton` instead of `<a>`/`<Link>`.
- **Path alias**: `@/*` maps to project root (e.g., `@/src/components/...`).

## Environment Variables

Configured in `.env` (see `.env.example`). Key ones:
- `STRAPI_API_URL` — internal Strapi URL (`http://backend:1337` in Docker)
- `NEXT_PUBLIC_CMS_URL` — public Strapi URL (for image URLs in browser)
- `STRAPI_API_TOKEN` — Bearer token for Strapi API
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — callback notifications
- `DATABASE_*` — PostgreSQL connection (masterdb/masteruser/masterpass)

## Design System

- Dark theme: `bg-[#383838]`, white text with opacity variants (white/80, white/60, white/50)
- Accent: `#F3DF3A` (yellow CTA buttons)
- Borders: `border-white/10`
- Font: Geist Sans/Mono
- Glassmorphism: `bg-white/5 backdrop-blur-sm`
- Responsive: mobile-first with sm/md/lg breakpoints
