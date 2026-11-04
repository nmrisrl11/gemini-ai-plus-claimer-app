# Google AI Plus Portal — Official Web Hub & Distribution

[![Live Deployment: Vercel](https://img.shields.io/badge/deployment-Vercel-000000?style=flat-square&logo=vercel)](https://gemini-ai-plus-claimer.vercel.app/)
[![Platform: Windows 10 / 11](https://img.shields.io/badge/platform-Windows%2010%20%2F%2011%20(64--bit)-0284c7?style=flat-square&logo=windows)](https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases)
[![Version: v1.0.1](https://img.shields.io/badge/release-v1.0.1-38bdf8?style=flat-square&logo=github)](https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases/tag/v1.0.1)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![WCAG 2.1 AA Compliant](https://img.shields.io/badge/accessibility-WCAG%202.1%20AA-10b981?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Telemetry: Zero](https://img.shields.io/badge/telemetry-Zero%20(100%25%20Local)-10b981?style=flat-square)](#-privacy--local-execution)

Official web hub and release distribution portal for **Google AI Plus Portal** — a lightweight, zero-telemetry Windows desktop utility engineered to automate educational partner onboarding and resolve canonical official Google One offer links for 12 months of complimentary Gemini Advanced and 2TB cloud storage.

> **Open-Source Scope Notice**: This repository hosts the complete, open-source static landing page and release distribution portal under the **MIT License**. The underlying portable Windows desktop executable is distributed via official GitHub Releases; its automation script/engine is currently maintained in a separate private repository and is not yet open-source.

🌐 **Live Web Hub**: [https://gemini-ai-plus-claimer.vercel.app](https://gemini-ai-plus-claimer.vercel.app/)  
📦 **Official Release (v1.0.1)**: [https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases/tag/v1.0.1](https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases/tag/v1.0.1)

---

## 🛠️ Tech Stack & Tooling

The web hub is engineered for maximum performance, strict accessibility (WCAG 2.1 AA), zero client-side JavaScript overhead, and unified developer tooling.

| Category                 | Technology                                                 | Version                     | Purpose & Architectural Rationale                                                                                                                                                                                     |
| :----------------------- | :--------------------------------------------------------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**            | [Astro](https://astro.build/)                              | `^7.4.5` (v5 engine)        | Zero-JS static site generation (`output: "static"`). Compiles clean, semantic HTML/CSS without sending client framework runtimes to the browser, delivering instant load times and perfect 100/100 Lighthouse scores. |
| **Styling**              | [Tailwind CSS v4](https://tailwindcss.com/)                | `^4.3.4`                    | CSS-first utility architecture via the official `@tailwindcss/vite` plugin. Theme variables and utility classes are compiled and minified at build time with zero CSS-in-JS runtime penalty.                          |
| **Type System**          | [TypeScript](https://www.typescriptlang.org/)              | `^5.0.0`                    | Strict type definitions (`astro/tsconfigs/strict`) enforcing data integrity across config, constants, and component interfaces.                                                                                       |
| **Iconography**          | [Lucide Icons](https://lucide.dev/)                        | `^1.67.0` (`@lucide/astro`) | Highly accessible, scalable vector icons imported on demand with uniform stroke width (`1.75px`) and consistent `*Icon` naming convention.                                                                            |
| **Brand Vectors**        | Custom Astro Components                                    | Native SVG                  | Bespoke, accessible vector graphics in `src/components/icons/` (`GithubIcon.astro`, `WindowsIcon.astro`) for brand marks not in Lucide.                                                                               |
| **Linter & Formatter**   | [Biome](https://biomejs.dev/)                              | `2.6.4` (`@biomejs/biome`)  | Blazing-fast Rust toolchain (~40ms) handling linting, code formatting (tabs, 100 char width), and import organization in a single tool, replacing both ESLint and Prettier.                                           |
| **Hosting & Edge CDN**   | [Vercel](https://vercel.com/)                              | Global Edge                 | Static edge distribution with zero server compute overhead, automated Brotli compression, and HTTP/3 delivery worldwide.                                                                                              |
| **Traffic Analytics**    | [Vercel Web Analytics](https://vercel.com/analytics)       | `^2.0.1`                    | Privacy-friendly, cookieless traffic analytics integrated with zero tracking cookies or PII collection.                                                                                                               |
| **Performance Insights** | [Vercel Speed Insights](https://vercel.com/speed-insights) | `^2.0.0`                    | Real-user monitoring for Core Web Vitals (Largest Contentful Paint, Interaction to Next Paint, Cumulative Layout Shift).                                                                                              |
| **Typography**           | Google Fonts                                               | Web Fonts                   | **Inter** for clean, readable UI copy and **JetBrains Mono** for technical specs, terminal logs, and system readouts.                                                                                                 |
| **Accessibility (a11y)** | WCAG 2.1 AA                                                | Specification               | Semantic landmark roles, skip navigation links, high-contrast palette (7.5:1+), reduced-motion media queries, and accessible form structures.                                                                         |

---

## 📁 Repository Structure

```
gemini-ai-plus-claimer-app/
├── astro.config.mjs         # Static output ('static'), Tailwind Vite plugin, canonical site URL
├── biome.json               # Unified Biome linter and formatter configuration
├── tsconfig.json            # Strict TypeScript configuration
├── package.json             # Build scripts (dev, build, preview, check, lint) & dependencies
├── vercel.json              # Vercel deployment configuration (framework: astro, output: dist)
├── README.md                # Project documentation and deployment guide
├── AGENTS.md                # Architectural blueprint and AI context handoff
├── CHANGELOG.md             # Comprehensive version history & release changelog
├── .gitignore               # Git exclusion rules
├── public/                  # Static assets served untouched at root
│   ├── images/              # Icons, app screenshots, QR codes, og-image.png
│   ├── robots.txt           # Search crawler directives & sitemap reference
│   ├── sitemap.xml          # Canonical XML sitemap for SEO discovery
│   └── site.webmanifest     # Mobile bookmark & PWA manifest
└── src/
    ├── config.ts            # Centralized VERSION, GitHub links, developer URLs, verification ID
    ├── styles/
    │   ├── global.css       # Clean scrollbars, stable gutter, blinking terminal cursor
    │   └── navbar.css       # Dynamic floating pill navbar transitions & concentric radii
    ├── scripts/
    │   └── navbar.ts        # Interactive navbar controller (drawer toggle, hysteresis, scrollspy)
    ├── layouts/Layout.astro # Universal layout (SEO, OpenGraph, dynamic Schema.org JSON-LD, analytics)
    ├── pages/
    │   ├── index.astro      # Assembles all sections inside Layout
    │   └── 404.astro        # Dedicated accessible 404 error page
    ├── constants/           # Strictly typed content models (kebab-case)
    │   ├── browsers.ts      # Multi-browser tiers, discovery cascade sequence
    │   ├── faq.ts           # Frequently asked questions & answers
    │   ├── features.ts      # 6 engineering highlight cards & specs
    │   ├── footer.ts        # 3-column navigation & developer credits
    │   ├── hero.ts          # Hero spec ribbon, terminal logs, and mock profile data
    │   ├── how-it-works.ts  # 5-stage automated pipeline steps
    │   ├── navigation.ts    # Navbar navigation links & CTAs
    │   ├── requirements.ts  # System specs & Google One verification guidelines
    │   ├── support.ts       # Buy Me a Coffee & GCash funding details
    │   └── why-automate.ts  # Manual vs Automated comparison matrix
    └── components/
        ├── icons/           # Bespoke brand SVG icons (GithubIcon, WindowsIcon)
        ├── Navbar.astro     # Sticky navbar, mobile drawer with Escape key listener, CTA
        ├── Hero.astro       # Headline, spec ribbon, CTAs, desktop UI preview mockup
        ├── WhyAutomate.astro# Comparison matrix (Manual Educational Gateway vs Automated Flow)
        ├── HowItWorks.astro # 5-stage automated provisioning pipeline rail
        ├── Features.astro   # 6 engineering cards (multi-browser cascade, F12 diagnostics, etc.)
        ├── Browsers.astro   # 4-engine browser grid (Edge, Chrome, Brave, Opera/Vivaldi)
        ├── Requirements.astro # Split-pane specs table & $0.00 billing verification notice
        ├── Support.astro    # Unified Buy Me a Coffee & GCash QR code bento
        ├── FAQ.astro        # Interactive details/summary accordion
        └── Footer.astro     # 3-column footer, legal disclaimer, status badges
```

---

## ⚡ Key Features of the Web Hub

### 1. Modern De-Slopped Design System & Typed Constants Architecture

- **Dynamic Scroll-Responsive Pill Navbar**: Symmetrically aligned floating navbar that contracts into an elevated dock on scroll with concentric nested corner radii ($R_{\text{outer}} = 20\text{px}$, $R_{\text{inner}} = 12\text{px}$), smoothly gliding navigation tabs to the edge with tight $8\text{px}$ insets while desktop actions collapse without flicker.
- **Decoupled Component Architecture**: Component styling and client interactivity are cleanly isolated into dedicated stylesheets (`src/styles/navbar.css`) and modular TypeScript scripts (`src/scripts/navbar.ts`), eliminating inline code bloat and leveraging Vite's compilation and minification pipeline.
- **Mobile Touch & Viewport Precision**: Configured `touch-action: manipulation;` and 16px minimum touch targets across all interactive buttons, completely preventing 300ms double-tap delays and unwanted iOS Safari focus zoom gestures.
- **Lucide Icon Integration**: Powered by `@lucide/astro` with uniform stroke widths and accessible SVG labeling across all UI components.
- **Separation of Concerns**: 100% of landing page copy, specifications, and pipeline stages are decoupled into typed TypeScript constants in `src/constants/` (_kebab-case_).
- **Restrained Dark Theme**: Minimalist dark slate palette (`#090d16`) with subtle `slate-800` borders, eliminating noisy gradients and badge spam.

### 2. Universal Multi-Browser Engine Showcase

- **Intelligent 5-Tier Discovery Cascade**: Detects and binds to existing Chromium browsers on the user's PC:
  1. Google Chrome channel (`chrome`)
  2. Microsoft Edge channel (`msedge` — pre-installed on 100% of Windows 10 & 11 PCs)
  3. Direct scan for Brave Browser, Google Chrome, Microsoft Edge, Opera, and Vivaldi
  4. Local Playwright cache (`%LOCALAPPDATA%\ms-playwright`)
  5. Unbundled fallback
- **Zero-Bloat Guarantee**: Runs out-of-the-box without downloading or bundling 400MB browser runtimes.

### 3. Transparent GitHub Releases Distribution & Safe Browsing Compliance

- **GitHub Releases Distribution Hub**: All download buttons and CTAs route directly to the official [GitHub Release Hub (v1.0.1)](https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases/tag/v1.0.1), ensuring transparent hosting, binary integrity verification (SHA-256), and compliance with Google Safe Browsing standards.
- **De-risked Educational Copywriting**: Neutral phrasing strictly emphasizing local Playwright automation, canonical link extraction, and identity verification compliance.
- **Open-Source Landing Page**: MIT-licensed landing page source code providing full transparency for web visitors.

### 4. Accessibility (WCAG 2.1 AA Compliance)

- **Bypass Blocks (`2.4.1`)**: Accessible keyboard "Skip to main content" link placed at the top of `<body>`.
- **Form Field Cleanliness**: Desktop mockup uses semantic `<span>` tags instead of orphaned `<label>` tags, resolving Chrome DevTools accessibility audits.
- **Landmark Regions**: Proper semantic structure using `<header role="banner">`, `<main id="main-content">`, `<footer role="contentinfo">`, and uniquely labeled navigation regions.
- **Screen Reader Announcer (`4.1.3`)**: Dynamic `aria-live="polite"` region alerts assistive tech users when code snippets or hashes are copied to clipboard.
- **Sanitized Decorative SVGs (`1.1.1`)**: All decorative inline SVGs contain `aria-hidden="true" focusable="false"`.
- **Reduced Motion (`2.3.3` & `2.2.2`)**: Media queries automatically disable smooth scrolling and blinking cursors for visitors with vestibular motion sensitivities.

### 5. SEO & Rich Social Previews

- **High-Resolution OpenGraph & Twitter Cards**: 1200&times;630 `og:image` and `summary_large_image` Twitter card for rich previews on Discord, Telegram, X, and Slack.
- **Structured Data (JSON-LD)**: `SoftwareApplication` and `WebSite` schemas providing search engines with software version, license price ($0.00), OS compatibility, and author details for rich search snippets.
- **Search Engine Discoverability**: Deployed `robots.txt` and `sitemap.xml` referencing canonical URLs.

---

## 🚀 Deployment (Vercel)

The landing page is optimized for instant static hosting on Vercel with zero server compute costs ($0 Edge CDN):

1. Connect `nmrisrl11/gemini-ai-plus-claimer-app` to your Vercel account.
2. Vercel automatically detects the **Astro** framework preset via `package.json` and `vercel.json`.
3. The build command `astro build` compiles static HTML, CSS, and assets into `dist/`.
4. Any push to `main` automatically triggers deployment and activates Vercel Analytics and Speed Insights.

---

## 📦 Release Package Details (v1.0.1)

| Attribute              | Specification                                                      |
| :--------------------- | :----------------------------------------------------------------- |
| **Release Version**    | `v1.0.1` (Stable)                                                  |
| **Release Archive**    | `Google AI Plus Portal v1.0.1 by nmrisrl11.zip`                    |
| **Application Binary** | `Google AI Plus Portal v1.0.1.exe`                                 |
| **Target OS**          | Windows 10 / Windows 11 (64-bit)                                   |
| **Package Type**       | Single portable binary (Zero installation)                         |
| **Binary SHA-256**     | `803F5ACCE69119A96D667CC38FB48B8B5A7BDC2040C1E3C1EE98DEA0F8118605` |
| **Archive SHA-256**    | `487A8A9AF27C22B1B76792617014E25F0E7F6B0CA12CAB8D83168DF95AF6646C` |

### Checksum Verification in PowerShell:

```powershell
Get-FileHash "Google AI Plus Portal v1.0.1.exe" -Algorithm SHA256
```

---

## 🛠️ Local Development & Code Quality

```bash
# Install dependencies
npm install

# Start local dev server (hot reload)
npm run dev

# Compile static production build into dist/
npm run build

# Preview production build locally
npm run preview

# Lint, check formatting, and organize imports with Biome
npm run lint

# Auto-format and apply safe fixes with Biome
npm run check
```

---

## ⚖️ Disclaimer & Non-Affiliation

This project is an independent utility provided strictly for convenience, personal educational testing, and research. This project is **not** affiliated with, sponsored by, or endorsed by Google LLC, Alphabet Inc., or Internshala. Google, Google One, and Gemini are trademarks of Google LLC.
