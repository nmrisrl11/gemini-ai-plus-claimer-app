# Changelog

All notable changes to the **Google AI Plus Portal** landing page and distribution hub will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.1] - 2026-11-05

### Added

- **Modular Component Architecture & Decoupling**:
  - Renamed `AGENT.md` to `AGENTS.md` following standard AI agent documentation conventions and updated all cross-repository references.
  - Decoupled `Navbar.astro` styles into a dedicated stylesheet `src/styles/navbar.css` injected into `src/styles/global.css` via `@import "./navbar.css";`, natively bundled by Tailwind CSS v4 and Vite.
  - Extracted client-side interactive navbar logic into an independent TypeScript module `src/scripts/navbar.ts`, transpiled and minified via `<script src="../scripts/navbar.ts"></script>`.
  - Reduced `Navbar.astro` template footprint from 488 lines down to 178 lines of clean semantic markup.
- **Dynamic Scroll-Responsive Pill Navbar**:
  - Implemented dynamic shrinking floating pill navbar on scroll with hysteresis deadband (`SCROLL_ACTIVATE_PX = 50`, `SCROLL_DEACTIVATE_PX = 20`) eliminating threshold chatter and visual flicker.
  - Engineered smooth gliding animation for the segmented nav track to the right side of the pill while desktop actions collapse (`opacity-0 scale-92 max-w-0`).
  - Applied the concentric nested corner radius formula ($R_{\text{inner}} = R_{\text{outer}} - \text{Inset}$) with $R_{\text{outer}} = 20\text{px}$, $8\text{px}$ insets, and $R_{\text{inner}} = 12\text{px}$ across logo box, nav track, and mobile menu button for symmetrical edge alignment.
- **Comprehensive Tech Stack & Tooling Architecture Documentation**:
  - Added dedicated tech stack matrices and architectural rationale in `README.md` and `AGENTS.md` covering Astro 5, Tailwind CSS v4 (@tailwindcss/vite), Biome 2.6.4, Lucide Icons (@lucide/astro), TypeScript, and Vercel edge delivery.
- **Lucide Icon System Migration**:
  - Migrated entire iconography footprint from inline SVGs to `@lucide/astro`, adhering to strict `*Icon` import aliasing.
  - Created bespoke brand vector components in `src/components/icons/` (`GithubIcon.astro`, `WindowsIcon.astro`).
- **Typed Constants Architecture (`src/constants/`)**:
  - Extracted 100% of hardcoded landing page content, copy, specs, and pipeline data into strongly-typed TypeScript constants in strict _kebab-case_ naming (`browsers.ts`, `faq.ts`, `features.ts`, `footer.ts`, `hero.ts`, `how-it-works.ts`, `navigation.ts`, `requirements.ts`, `support.ts`, `why-automate.ts`).
- **Comprehensive UI/UX Redesign & De-Slop Across All 8 Sections**:
  - **Hero**: Engineered flush spec ribbon with clean `divide-x` borders and streamlined metadata pills.
  - **WhyAutomate**: Converted noisy cards into a high-density, 2-column comparative matrix table (`Manual Educational Gateway` vs `Automated Playwright Flow`).
  - **HowItWorks**: Built a connected vertical pipeline rail with centered nodes and responsive mobile headers.
  - **Features**: Streamlined 6 engineering cards with unified sky accents, removed card-in-card inception, and added bottom spec metadata rows.
  - **Browsers**: Unified browser tier tags (`T01`–`T04`) and implemented a sequential cascade breadcrumb banner.
  - **Requirements**: Designed a split-pane specification panel (`divide-x`) with clean host requirements on the left and numbered Google One verification guidelines (`01`, `02`, `03`) on the right.
  - **Support**: Unified Buy Me a Coffee and GCash appreciation cards into a clean bento grid with direct web donation actions (`Open buymeacoffee.com ↗`).
  - **FAQ**: Consolidated accordion into a single unified container with `divide-y divide-slate-800/80` and numbered question headers (`01`–`05`).
  - **Footer**: Revamped into a clean 3-column navigation grid (`Product`, `Resources & Code`, `Developer & Support`) with harmonized slate execution badges and comprehensive legal disclaimers.

### Fixed

- **Full-Width Focus Outline on Escape & Mobile Tap**: Resolved an issue where pressing <kbd>Esc</kbd> or tapping on mobile caused a 2px horizontal sky-blue line across the top of `<main>` by scoping `:focus-visible` strictly to interactive elements (`a`, `button`, `input`, etc.) and explicitly resetting outlines on container landmarks (`main`, `#main-content`, `header`, `#site-header`, `body`, `html`, `[tabindex="-1"]`).
- **Mobile Viewport Zooming on Hamburger Toggle**: Fixed unintended page zooming when tapping the mobile menu open/close button by adding `touch-action: manipulation;` across all interactive elements, setting `font-size: 16px` on `#mobile-menu-btn` to prevent iOS Safari auto-focus zooming, and locking mobile viewport scaling via `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />`.
- **Mobile Menu Horizontal Layout Bug**: Resolved layout issue where the mobile navigation drawer rendered side-by-side with the navbar by adding `flex-col items-center` to `<header>`, ensuring clean vertical stacking.
- **FAQ Chevron Double-Rotation Bug**: Fixed 360° rotation issue where `<details>` chevron rotated back to pointing down upon opening due to stacked rotation CSS rules.
- **Accessibility & Form Field Audit**: Replaced 5 decorative `<label>` tags with `<span>` in `Hero.astro` desktop application preview mockup, resolving Chrome DevTools _"No label associated with a form field"_ errors.
- **Missing Inline Whitespace in Astro Render**: Added explicit spaces around inline `<code>` and `<span>` elements across all sections to eliminate collapsed word rendering.

### Security & Compliance

- **Open-Source Scope Precision**: Clarified across Hero, Support, Footer, and Layout that the landing page website source is open-source under MIT, while the desktop automation executable is an independent utility whose source code is not yet open-source.
- **Crawler & Safe Browsing Sanitization**: Completely purged high-risk heuristic triggers (`session tokens`, `token extraction/grabber`, `claiming free accounts`, `authentication bypass`) across all constants and components, replacing them with neutral educational automation terminology (`partner referral routes`, `confirmation emails`, `canonical link resolution`).

---

## [1.0.0] - 2026-10-30

### Added

- **Official OpenGraph Banner**: Added high-resolution 1200&times;630 `og-image.png` and configured Twitter `summary_large_image` card for rich link previews across messaging platforms and social networks.
- **Accessibility Enhancements (WCAG 2.1 AA)**:
  - Added accessible keyboard "Skip to main content" bypass link at the top of `<body>`.
  - Added semantic landmark roles (`role="banner"`, `<main id="main-content">`, `role="contentinfo"`).
  - Attached distinct accessible labels (`aria-label`) to desktop, mobile, and footer navigation bars.
  - Added dynamic `aria-live="polite"` screen-reader announcer for clipboard copy feedback.
  - Sanitized all 26 inline decorative SVGs with `aria-hidden="true" focusable="false"`.
- **Responsive Architecture**: Mobile navigation drawer with hamburger toggle, focus trapping, and click-outside dismissal.
- **Full Landing Page Structure**: Hero section, Features, Expectations, FAQ, Support Developer QR codes, and Legal Disclaimer footer.
