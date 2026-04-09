# crafta-web

Premium marketing and documentation portal for the full Crafta ecosystem.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind v4 base + custom premium CSS design system

## Pages

- /: animated Crafta ecosystem landing page
- /packages: package catalog for core, auth, and upcoming modules
- /packages/[pkg]: detailed package docs with dual sidebars
- /docs: docs hub for all packages
- /docs/[pkg]: package docs with left package sidebar and right subtopic sidebar
- /guides: implementation and hardening guides
- /showcase: product use-case showcase
- /ecosystem: official org accounts and ecosystem links
- /contact: contact page and support details

## SEO & Search

- Dynamic sitemap: /sitemap.xml
- robots policy: /robots.txt
- Rich metadata + keyword strategy for Crafta and package terms

## Run Locally

```bash
cd crafta-web
npm install
npm run dev
```

Open http://localhost:3000

## Build and Lint

```bash
npm run lint
npm run build
```

## Isolation

This app is fully self-contained in the crafta-web folder and does not modify runtime behavior of the auth package in the workspace root.
