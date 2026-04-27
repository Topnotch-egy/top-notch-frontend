# Top Notch - Marketing Agency Landing Page

A dynamic, bilingual (English / Arabic) landing page built with **Next.js 16**, **React 19**, **Tailwind CSS**, and **Framer Motion**. Responsive down to **370px**, with full RTL support, animated backgrounds, video hero media, scroll-triggered reveals, and a marquee client showcase.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 3
- Framer Motion
- Lucide React icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Structure

```text
src/
|-- app/
|   |-- layout.tsx          # Root layout, fonts, LanguageProvider
|   |-- page.tsx            # Page composition
|   `-- globals.css         # Tailwind + custom utilities
|-- components/
|   |-- AnimatedBackground.tsx
|   |-- Navbar.tsx
|   |-- Hero.tsx
|   |-- About.tsx
|   |-- Services.tsx
|   |-- Clients.tsx
|   |-- Contact.tsx
|   `-- Footer.tsx
`-- lib/
    |-- content.ts          # EN/AR bilingual content
    `-- language-context.tsx
public/
|-- hero.mp4
`-- logo.jpg
```

## Language Toggle

Click the `EN/AR` button in the navbar. Toggles locale, writes to `localStorage`, and flips `html[dir]` to `rtl` for Arabic. The layout mirrors automatically via Tailwind's logical properties.
