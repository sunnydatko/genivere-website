<div align="center">
  <img src="app/icon.svg" alt="Eclipse" width="64" height="64" />

  # Eclipse

  **A cinematic portfolio template built for AI developers, technical founders, and engineers building amibitious things.**

  Built with Next.js 16 · React 19 · Material UI 9 · TypeScript

  [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
  [![MUI](https://img.shields.io/badge/MUI-9-007FFF?style=flat-square&logo=mui)](https://mui.com)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

</div>

---

## Preview

![Eclipse preview](public/screenshot.png)

---

## Design

Eclipse is built for a specific reader: someone technical, skeptical of noise, and evaluating your work on substance. The aesthetic reflects that. Dark by default, precise in layout, and deliberately low-decoration — it gets out of the way and lets your projects and writing do the talking.

- **Space-dark palette** — near-black backgrounds with cool blue-white accents; the visual language of terminals, IDEs, and serious tooling
- **Ambient motion** — a slow, living backdrop that suggests depth without distracting from content
- **Engineering-first typography** — Space Grotesk for headlines, Inter for body; hierarchy through weight and spacing alone
- **Signal over chrome** — no sidebars, no noise, no gradients competing for attention; structured for readers who scan for substance
- **Scroll-driven reveals** — content surfaces progressively as you move through the page, each section arriving with quiet intention

Eclipse resonates with the people who matter most to AI developers and technical builders: recruiters at AI labs, engineers evaluating collaborators, and founders looking for technical depth. The design signals craft without announcing it.

---

## What's included

- **Hero** — headline, subhead, and social links
- **About** — personal bio and summary
- **Experience** — chronological work history with company, role, and highlights
- **Blog** — card grid of articles with individual post pages at `/blog/[slug]`
- **Contact** — inbound contact form
- **Scroll animations** — CSS-driven reveal system via Intersection Observer, no animation library required
- **SEO-ready** — server-side rendering, Metadata API, statically generated blog pages, optimized images

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | Material UI 9 + Emotion |
| Language | TypeScript 5 |
| Fonts | Space Grotesk + Inter via `next/font` |
| Runtime | React 19 |

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Customization

All content lives in one file:

**`app/helpers/config.ts`**

```ts
export const social = [...]      // GitHub, LinkedIn, X
export const experience = [...]  // Work history
export const blogPosts = [...]   // Blog post metadata
export const education = [...]   // Education
```

The theme — colors, typography, dark mode — is in **`app/theme.ts`**.

---

## Project structure

```
app/
├── blog/[slug]/         # Dynamic blog post pages
├── components/          # All UI sections and layout components
│   ├── Ambient.tsx      # Animated background
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Writing.tsx      # Blog card grid
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ScrollReveal.tsx # Intersection Observer scroll animations
├── helpers/config.ts    # Site content (single source of truth)
├── theme.ts             # MUI theme
├── globals.css          # Global styles + .reveal animation
├── layout.tsx           # Root layout with metadata
└── page.tsx             # Home page
```

---

## Deployment

```bash
npx vercel
```

All blog pages are pre-rendered at build time — fast, CDN-friendly, no runtime overhead.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |
