# AGENT.md — Project Blueprint & AI Context Handoff

> **For Future AI Agents & Developers**:  
> This file is the primary context and architectural blueprint for the **Google AI Plus Portal** landing page and distribution hub (`gemini-ai-plus-claimer-app`). Read this document first before writing code, modifying layout, updating links, or making releases.

---

## 1. 📌 Executive Summary & Project Purpose

- **Product Name**: Google AI Plus Portal
- **Type**: High-conversion, accessible, zero-telemetry landing page & release distribution hub
- **Production URL**: [https://gemini-ai-plus-claimer.vercel.app](https://gemini-ai-plus-claimer.vercel.app/)
- **Landing Page Repository (Public / Open Source)**: [https://github.com/nmrisrl11/gemini-ai-plus-claimer-app](https://github.com/nmrisrl11/gemini-ai-plus-claimer-app)
- **License**: MIT License (applies to this web hub repository)
- **Underlying Desktop Software**: A standalone, native Windows 10/11 (64-bit) portable executable that automates educational partner onboarding and resolves canonical official Google One offer links for 12 months of complimentary Gemini Advanced and 2TB cloud storage.
- **CRITICAL REPOSITORY & OPEN-SOURCE BOUNDARY**:
  - `gemini-ai-plus-claimer-app` is the **PUBLIC** static landing page and compiled release distribution repository. Its website source code is fully open-source under the MIT license.
  - The actual Python automation source code is located in a **SEPARATE PRIVATE REPOSITORY** (`gemini-ai-plus-claimer`) and is **NOT YET OPEN-SOURCE**.
  - **DO NOT** state or imply in copywriting that the desktop script/application itself is open-source.
  - **DO NOT** commit Python automation source files, backend logic, or private scripts into this public repository.

---

## 2. 🏗️ Tech Stack & Tooling Architecture

The landing page web hub is engineered for maximum performance, strict accessibility (WCAG 2.1 AA), zero client-side JavaScript bloat, and lightning-fast developer tooling.

### Tooling & Technology Matrix

| Layer                    | Technology                                                 | Package / Version                                      | Purpose & Architectural Rationale                                                                                                                                               |
| :----------------------- | :--------------------------------------------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework**            | [Astro](https://astro.build/)                              | `astro` `^7.4.5` (v5 engine)                           | Zero-JS static site generation (`output: "static"`). Produces pure static HTML/CSS with near-zero runtime overhead for pure UI components, achieving 100/100 Lighthouse scores. |
| **Styling**              | [Tailwind CSS v4](https://tailwindcss.com/)                | `@tailwindcss/vite` `^4.3.4`<br>`tailwindcss` `^4.3.4` | Modern CSS-first architecture via official Vite plugin; compiled & purged at build time into minified CSS without CSS-in-JS runtime overhead.                                   |
| **Type Safety**          | [TypeScript](https://www.typescriptlang.org/)              | `typescript` `^5.0.0`                                  | Strict static type checking (`astro/tsconfigs/strict`) enforcing typed content models across `src/constants/` and component props.                                              |
| **Iconography**          | [Lucide Icons](https://lucide.dev/)                        | `@lucide/astro` `^1.67.0`                              | Tree-shakeable, accessible vector icon system. Enforces consistent stroke widths (`1.75px`) and unified `*Icon` naming convention.                                              |
| **Brand Vectors**        | Custom SVG Components                                      | `src/components/icons/*`                               | Bespoke accessible SVG components (`GithubIcon.astro`, `WindowsIcon.astro`) for brand marks not provided by Lucide.                                                             |
| **Linter & Formatter**   | [Biome](https://biomejs.dev/)                              | `@biomejs/biome` `2.6.4`                               | Unified Rust toolchain (~40ms) handling linting, code formatting (tabs, 100 char width), and import organization in a single tool, replacing Prettier and ESLint.               |
| **Hosting & Edge CDN**   | [Vercel](https://vercel.com/)                              | Platform                                               | Zero-compute static edge delivery with worldwide distribution, HTTP/3, and automatic Brotli compression.                                                                        |
| **Web Analytics**        | [Vercel Analytics](https://vercel.com/analytics)           | `@vercel/analytics` `^2.0.1`                           | Privacy-friendly, cookieless traffic analytics with zero tracking cookies or PII harvesting.                                                                                    |
| **Performance Insights** | [Vercel Speed Insights](https://vercel.com/speed-insights) | `@vercel/speed-insights` `^2.0.0`                      | Real-user monitoring for Core Web Vitals (LCP, INP, CLS).                                                                                                                       |
| **Typography**           | Google Fonts                                               | Web                                                    | **Inter** (UI typography) & **JetBrains Mono** (code, terminal, and spec readouts).                                                                                             |

### 2.1 Core Framework & Compiler (Astro 5 + TypeScript)

- **Static Compilation**: Configured in `astro.config.mjs` with `output: "static"` and site URL `https://gemini-ai-plus-claimer.vercel.app`.
- **Zero Client Overhead**: No client-side framework scripts (React, Vue, Svelte) are loaded in the browser. Interactive elements use standard HTML5 primitives (`<details>`, `<summary>`) and minimal vanilla DOM listeners.
- **Strict Typing**: Extends `astro/tsconfigs/strict` in `tsconfig.json`. All constants and data structures must have explicit interface definitions.

### 2.2 Styling System (Tailwind CSS v4 + Vite)

- **CSS-First Architecture**: Configured via `@tailwindcss/vite` plugin in `astro.config.mjs`. Theme variables and custom utilities reside in `src/styles/global.css`.
- **Design Tokens**: Dark slate palette (`slate-950` `#090d16` background, `slate-900` cards, `slate-800` borders, `sky-400` primary accents, `emerald-400` live status indicators).
- **Global Reset & Gutters**: `src/styles/global.css` specifies `scrollbar-gutter: stable; overflow-y: scroll;` to prevent layout shifts when navigating between routes.

### 2.3 Vector Iconography Standards

- **Import Convention**: Always alias Lucide imports with the **`*Icon`** suffix:

  ```astro
  import { ShieldCheck as ShieldCheckIcon, Terminal as TerminalIcon } from "lucide-astro";
  ```
- **Uniform Dimensions**: Icons use `w-4 h-4` (inline pills/specs) or `w-5 h-5` (headers/highlights) with `aria-hidden="true" focusable="false"`.
- **Custom Brand Icons**: For third-party platforms not in Lucide (GitHub, Windows), use bespoke `.astro` components located in `src/components/icons/`.

### 2.4 Code Quality & Developer Toolchain (Biome 2.6.4)

- **Single Source of Truth**: `biome.json` replaces both ESLint and Prettier.
- **Rules & Formatting**: Tab indentation, 100 character line width, double quotes for JS/TS, recommended linter presets with Tailwind directive support, and overrides for `.astro` files.
- **Command Cheat-Sheet**:

  ```bash
  # Check formatting, lint rules, and organize imports
  npm run check

  # Fast lint check without modifying files
  npm run lint

  # Format all files
  npm run format
  ```
- **VS Code Integration**: `.vscode/settings.json` configures `biomejs.biome` as the default formatter on save across Astro, JavaScript, TypeScript, JSON, and CSS files.

---

## 3. 📂 Repository File Tree & Purpose

```
gemini-ai-plus-claimer-app/
├── astro.config.mjs           # Astro configuration (static output, tailwind vite integration, canonical site URL)
├── biome.json                 # Unified Biome linter and formatter configuration (tabs, 100 print width, recommended rules)
├── tsconfig.json              # TypeScript configuration extending astro/tsconfigs/strict
├── package.json               # Project metadata, dependencies (@lucide/astro, @tailwindcss/vite), build & lint scripts
├── package-lock.json          # Deterministic dependency lockfile
├── vercel.json                # Vercel deployment configuration (framework: astro, output: dist)
├── AGENT.md                   # You are here: comprehensive AI agent context and architecture
├── README.md                  # User-facing repository overview, quickstart, and binary checksums
├── CHANGELOG.md               # Semantic Versioning change log (Keep a Changelog format)
├── .gitignore                 # Git exclusion rules (ignores node_modules, dist, .astro, .vercel, .env)
├── .vscode/                   # VS Code workspace settings (Biome default formatter)
│   ├── extensions.json
│   └── settings.json
├── public/                    # Static assets served untouched at root
│   ├── images/                # Icons, app screenshots, QR codes, og-image.png
│   ├── robots.txt             # Crawler instructions referencing canonical sitemap
│   ├── sitemap.xml            # Canonical XML sitemap for search engines
│   └── site.webmanifest       # PWA and mobile bookmark metadata
└── src/
    ├── config.ts              # Centralized configuration (VERSION, URLs, verification IDs)
    ├── styles/
    │   └── global.css         # Global styles, scrollbar styling, terminal blinking cursor
    ├── layouts/
    │   └── Layout.astro       # Universal root layout (SEO meta, OpenGraph, JSON-LD, analytics)
    ├── pages/
    │   ├── index.astro        # Home landing page assembling all section components
    │   └── 404.astro          # Dedicated accessible 404 error page
    ├── constants/             # Strictly typed content models (kebab-case)
    │   ├── browsers.ts        # Browser discovery tiers (T01–T04), engine details, cascade steps
    │   ├── faq.ts             # FAQ items with markdown support & answer paragraphs
    │   ├── features.ts        # 6 engineering cards and technical specifications
    │   ├── footer.ts          # 3-column footer navigation links & developer profiles
    │   ├── hero.ts            # Hero spec ribbon, terminal logs, and mock profile data
    │   ├── how-it-works.ts    # 5-stage automated pipeline steps and node markers
    │   ├── navigation.ts      # Primary navigation links and desktop/mobile CTAs
    │   ├── requirements.ts    # Host requirements, specifications, and activation limits
    │   ├── support.ts         # Support channels (Buy Me a Coffee, GCash) & descriptions
    │   └── why-automate.ts    # Manual vs Automated comparison matrix data
    └── components/
        ├── icons/             # Bespoke brand SVG components
        │   ├── GithubIcon.astro
        │   └── WindowsIcon.astro
        ├── Navbar.astro       # Responsive sticky header with mobile drawer & Escape listener
        ├── Hero.astro         # Hero headline, CTA buttons, spec ribbon, interactive Mockup preview
        ├── WhyAutomate.astro  # Problem vs Solution comparison matrix table
        ├── HowItWorks.astro   # 5-stage automated provisioning pipeline rail
        ├── Features.astro     # 6 engineering highlight cards with spec metadata
        ├── Browsers.astro     # Multi-browser 4-engine support grid & cascade banner
        ├── Requirements.astro # System specs table & $0.00 billing verification notice
        ├── Support.astro      # Unified Buy Me a Coffee & GCash developer appreciation bento
        ├── FAQ.astro          # Interactive details/summary accordion questions
        └── Footer.astro       # 3-column navigation, legal disclaimers, status badges
```

---

## 4. 🧭 Component Architecture & Section Design System

All sections adhere to a restrained, dark slate engineering aesthetic (`slate-950` backgrounds, `slate-800` borders, `sky-400` primary accents, `emerald-400` success indicators). Content data is strictly separated into `src/constants/` files.

### 1. Header & Navigation (`Navbar.astro`)

- **Dynamic Scroll-Responsive Pill**:
  - Top State (`scrollY <= 20px`): Full `max-w-7xl` width, `h-16`, subtle border, brand subtitle visible, right actions (GitHub, Support, Download) expanded.
  - Scrolled State (`scrollY > 50px`): Contracts to `max-w-3xl` (48rem / 768px), `h-14`, elevated slate border, backdrop blur, and shadow. Desktop right actions collapse (`opacity-0 scale-92 max-w-0`), allowing the segmented nav track to smoothly glide to the right side with an exact $8\text{px}$ inset.
  - **Flicker-Free Hysteresis Deadband**: Enters scrolled state at $50\text{px}$ and returns to top state at $20\text{px}$, preventing boundary chatter.
  - **Concentric Nested Radius Formula**: $R_{\text{outer}} = 20\text{px}$, inset $= 8\text{px}$, inner radius $R_{\text{inner}} = 12\text{px}$ ($20 - 8 = 12$) across logo box, segmented nav track, and mobile button for symmetrical UI alignment.
- **Brand Identity**: Logo tile with subtle scale transition.
- **Desktop Navigation**: Links driven by `src/constants/navigation.ts`.
- **Direct Download CTA**: Desktop-visible button pointing to `CONFIG.DIRECT_DOWNLOAD_URL`.
- **Mobile Menu**: Header structured with `flex flex-col items-center` ensuring the mobile drawer vertically stacks directly below the navbar pill. Accessible `<button id="mobile-menu-btn">` with `aria-controls="mobile-menu"`, `aria-expanded="false"`, toggles mobile drawer with auto-close on navigation or <kbd>Esc</kbd>.

### 2. Hero Section (`Hero.astro` + `src/constants/hero.ts`)

- **Spec Ribbon**: Single unified container with `divide-x divide-slate-800` displaying `Windows 10 / 11 64-bit`, `v1.0.1 Portable`, and `100% Local Execution`.
- **Headline**: High-clarity value proposition with no hype or spam.
- **CTAs**: Primary Sky-600 download button and secondary GitHub Repository link.
- **Interactive Mockup**: Full visual preview of the portable desktop utility with simulated demographic form (`<span>` tags for field descriptors to prevent a11y violations), step indicator rail, and live terminal readout.

### 3. Comparison Matrix (`WhyAutomate.astro` + `src/constants/why-automate.ts`)

- Replaces generic marketing cards with a high-density, 2-column comparative table (`Manual Educational Gateway` vs `Automated Playwright Flow`).
- Clear indicators comparing manual friction points (email roundtrips, session expirations) with local automated execution.

### 4. 5-Stage Pipeline (`HowItWorks.astro` + `src/constants/how-it-works.ts`)

- Connected vertical pipeline rail with centered nodes and step numbers (`01`–`05`).
- Responsive layout featuring an inline mobile header (`01 • Title`) and detailed technical explanations.

### 5. Engineering Highlights (`Features.astro` + `src/constants/features.ts`)

- 6 structured cards highlighting Zero-Bloat Portable Architecture, 100% Local & Private Execution, Canonical Link Resolution, Dual Delivery Engine, Smart Challenge Safety, and Built-in Diagnostics (<kbd>F12</kbd>).
- Bottom metadata spec row on each card displaying engine specifications.

### 6. Universal Multi-Browser Support (`Browsers.astro` + `src/constants/browsers.ts`)

- 4-engine compatibility grid (Microsoft Edge, Google Chrome, Brave Browser, Opera & Vivaldi).
- Unified tier badges (`T01`–`T04`) with a sequential cascade breadcrumb banner illustrating automatic fallback detection.

### 7. Requirements & Expectations (`Requirements.astro` + `src/constants/requirements.ts`)

- Split-pane specification panel (`divide-x divide-slate-800` on desktop).
- Left pane: Clean host requirements table (OS, Browser, Dependencies, Account Type, Binary Package).
- Right pane: Google One activation guidelines (`01`, `02`, `03`) explaining the official `$0.00 Billed Today` card verification requirement and single-use promo rules.

### 8. Support Developer (`Support.astro` + `src/constants/support.ts`)

- Unified bento grid containing Buy Me a Coffee and GCash appreciation cards.
- Direct web donation actions (`Open buymeacoffee.com ↗`) alongside high-contrast QR codes.

### 9. Frequently Asked Questions (`FAQ.astro` + `src/constants/faq.ts`)

- Semantic `<details>` and `<summary>` accordions styled in a single unified container with `divide-y divide-slate-800/80`.
- Numbered index headers (`01`, `02`, `...`) and CSS rotation on the chevron icon (`group-open:rotate-180`). Note: do not duplicate rotation in CSS classes to avoid 360° rotation bugs.

### 10. Footer (`Footer.astro` + `src/constants/footer.ts`)

- 3-column navigation grid: `Product`, `Resources & Code`, and `Developer & Support`.
- Comprehensive legal disclaimer and non-affiliation notice.
- Bottom metadata bar with copyright, live execution pill badges, and smooth "Back to top ↑" anchor.

---

## 5. 🔗 Configuration & Centralized Links

All project-level URLs and parameters are centralized in `src/config.ts`:

```typescript
export const CONFIG = {
	VERSION: "v1.0.1",
	BUILD_DATE: "2026-11-03",
	REPO_URL: "https://github.com/nmrisrl11/gemini-ai-plus-claimer-app",
	AUTHOR_NAME: "nmrisrl11",
	AUTHOR_URL: "https://github.com/nmrisrl11",
	DONATION_URL: "https://buymeacoffee.com/nmrisrl11",

	get RELEASES_URL() {
		return `${this.REPO_URL}/releases`;
	},
	get LATEST_RELEASE_URL() {
		return `${this.REPO_URL}/releases/latest`;
	},
	get DIRECT_DOWNLOAD_URL() {
		return `${this.REPO_URL}/releases/tag/${this.VERSION}`;
	},
	get ARCHIVE_FILENAME() {
		return `Google AI Plus Portal ${this.VERSION} by nmrisrl11.zip`;
	},
	get BINARY_FILENAME() {
		return `Google AI Plus Portal ${this.VERSION}.exe`;
	},
};
```

---

## 6. ♿ Accessibility (WCAG 2.1 AA) Compliance Details

1. **Skip Navigation Link (SC 2.4.1)**:
   Located immediately after `<body>` in `src/layouts/Layout.astro`:

   ```html
   <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 ...">
     Skip to main content
   </a>
   ```
2. **Form Field Labels (SC 1.3.1 / 4.1.2)**:
   Never use `<label>` tags for non-form decorative UI elements (such as simulated application preview fields in `Hero.astro`). Use `<span>` or `<div>` to avoid triggering Chrome DevTools _"No label associated with a form field"_ accessibility violations.
3. **Decorative SVGs (SC 1.1.1)**:
   All icons and decorative SVGs must have `aria-hidden="true" focusable="false"`.
4. **Reduced Motion (SC 2.3.3 & 2.2.2)**:
   `src/styles/global.css` includes `@media (prefers-reduced-motion: reduce)` which disables animations and smooth scrolling.
5. **Color Contrast (SC 1.4.3)**:
   All typography against `#090d16` (slate-950) uses `#94a3b8` (slate-400, 7.58:1) or lighter, exceeding WCAG AAA requirements.

---

## 7. 🛡️ Phishing Prevention & Safe Browsing Guidelines

Automated security crawlers (Google Safe Browsing, Microsoft SmartScreen, Vercel Security) analyze landing pages for deceptive patterns. To ensure the page is never flagged:

1. **Forbidden Terms & Patterns**:
   - **DO NOT** use: `session tokens`, `token grabber`, `token extraction`, `claim free accounts`, `authentication bypass`, `credential harvester`.
   - **DO NOT** simulate realistic credential login forms (e.g., asking for password or credit card numbers in mockups).
2. **Approved Engineering Terminology**:
   - Use: `educational partner onboarding`, `partner referral routes`, `canonical offer URL resolution`, `local Playwright automation`, `incoming confirmation emails`.
3. **Download Transparency**:
   - All download CTAs route transparently to official GitHub Releases rather than serving obfuscated direct binary streams.
4. **Disclaimers**:
   - Clear and prominent non-affiliation notices must be present in both the hero and footer sections.

---

## 8. 🛠️ Instructions for Future AI Agents & Developers

When contributing to this repository, you **MUST** follow these engineering standards:

1. **Biome Tooling (Mandatory)**:
   Do NOT use Prettier or ESLint. Biome is the sole linter and formatter:

   ```bash
   # Check formatting, lint rules, and import sorting
   npm run check

   # Run linter
   npm run lint
   ```
2. **Data & Component Separation**:
   - Store all section content, lists, steps, and copy in `src/constants/<section-name>.ts`.
   - File names in `src/constants/` must strictly use **kebab-case** (`hero.ts`, `why-automate.ts`, `how-it-works.ts`, etc.).
   - `.astro` components should import constants and map over them, keeping markup clean and maintainable.
3. **Icon Usage**:
   - Use Lucide icons from `@lucide/astro` with the **`*Icon`** suffix convention:

     ```astro
     ---
     import { ShieldCheck as ShieldCheckIcon, Terminal as TerminalIcon } from "lucide-astro";
     ---
     <ShieldCheckIcon class="w-4 h-4 text-emerald-400" aria-hidden="true" />
     ```
   - For bespoke brand icons (e.g. GitHub, Windows), import from `src/components/icons/`.
4. **Build Verification**:
   Always run a full build before committing:

   ```bash
   npm run build
   ```
5. **Git Commit & Push**:
   - Always verify git status with clean working tree.
   - Summarize changes concisely with conventional commit messages (`docs:`, `fix:`, `refactor:`, `feat:`).
   - **Always ask the user for confirmation before pushing changes to remote.**
