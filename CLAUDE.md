# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Austin Kelsay (bitcoinplebdev) - a Bitcoin/Lightning/Nostr developer and educator. Built with Next.js 14 (Pages Router), it serves as both a portfolio showcase and a Lightning Address/Nostr NIP-05 verification endpoint.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Pages Structure
- `pages/index.js` - Main portfolio page displaying projects, media appearances, skills, and about section
- `pages/resume.js` - Resume/CV page
- `pages/api/` - API routes for Lightning and Nostr functionality

### Data-Driven Content
All portfolio content is stored in `data/portfolio.json`:
- Projects, media appearances, skills, social links, resume data
- The homepage reads directly from this file - edit portfolio.json to update content

### Lightning/Nostr API Endpoints
The site implements LNURL-pay and Nostr protocols:
- `/api/lnurlp/[slug].js` - LNURL-pay endpoint (exposed at `/.well-known/lnurlp/:slug`)
- `/api/callback/[slug].js` - Invoice generation with zap request support
- `/api/nostr/nip05.js` - NIP-05 verification (exposed at `/.well-known/nostr.json`)
- `/api/lnd.js` - LND node interaction
- `/api/verify/[slug].js` - Invoice verification

URL rewrites in `next.config.js` map `.well-known` paths to API routes.

### External Services
- **Upstash Redis** - Used via `@upstash/redis` for data persistence (configured in `utils/redis.js`)
- **LND Node** - Backend Lightning node for invoice generation (requires `BACKEND_URL` env var)

### Environment Variables
```
KV_REST_API_URL    # Upstash Redis URL
KV_REST_API_TOKEN  # Upstash Redis token
BACKEND_URL        # Backend API URL for LND operations
NOSTR_PUBKEY       # Nostr public key for zap receipts
```

### Key Dependencies
- `nostr-tools` - Nostr protocol utilities (zap request verification)
- `gsap` - Animations (stagger effects in `animations/index.js`)
- `react-markdown` / `react-syntax-highlighter` - Markdown rendering
- `tailwindcss` - Styling with custom breakpoints (mob, tablet, laptop, laptopl, desktop)

### Component Pattern
Components are in `components/` with index.js barrel exports:
- `Header`, `Footer`, `WorkCard`, `MediaCard`, `ServiceCard`, `Socials`, `Button`
