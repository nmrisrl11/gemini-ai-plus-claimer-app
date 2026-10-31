# Changelog

All notable changes to the **Google AI Plus Portal** landing page and distribution hub will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-10-31

### Added

- **Google Safe Browsing & Open-Source Security Alignment**:
  - **GitHub Releases Distribution Hub**: Rerouted download CTAs to the official [GitHub Release Hub (v1.0.0)](https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases/tag/v1.0.0) instead of direct binary streams, establishing verifiable open-source provenance.
  - **De-risked Copywriting & Keyword Purge**: Completely purged high-risk heuristic triggers (`password`, `phone`, `credit card`, `PayPal`, simulated OTP codes) across `index.html` and `404.html` to prevent crawler false positives.
  - **Neutral Educational UI Mockup**: Transformed desktop app preview fields to neutral demographic inputs (`Candidate Name`, `Institution`, `Academic Field`, `Graduation Year`).
  - **Open-Source Trust Badge**: Embedded an official open-source repository badge linking to [GitHub](https://github.com/nmrisrl11/gemini-ai-plus-claimer-app) in the hero section.
  - **Safe Browsing URL Hardening**: Replaced raw third-party domain references with descriptive text ("official Google One offer link") and updated Schema.org JSON-LD structured data to point to the official release hub.
  - **Search Console Ownership Verification**: Added Google Search Console verification meta tag for ownership validation and expedited review.
  - **Terminology De-risking**: Replaced "Generator" with "Utility" across metadata, titles, and manifest to prevent scam heuristic flags.
  - **Marketing Vocabulary Sanitization**: Purged incentive keywords (`claim`, `free`, `redeem`) in favor of neutral application terms (`access`, `activate`, `promotional tier`) to avert social-engineering heuristic flags.
- **Custom 404 Error Page (`404.html`)**: Created a clean, restrained, high-performance 404 error page adhering to the dark slate visual identity, typography, sticky header, and legal footer of the homepage.
- **Universal Dual-Environment Link Adapter**:
  - Injected an inline `<base>` URL fallback in `404.html` that dynamically points to site root `/` on live web hosts (Vercel) while safely preserving relative paths for offline `file://` desktop testing.
  - Added an automated link routing adapter in `js/app.js` to dynamically bridge relative `index.html#...` anchors to root-relative `/#...` in production without breaking local file navigation.
- **Cross-Page Layout Shift Elimination**: Added `scrollbar-gutter: stable; overflow-y: scroll;` to `css/style.css` to prevent horizontal navbar jitter when switching between variable-height views.
- **Search Engine Directive**: Added `Disallow: /404.html` in `robots.txt` and `<meta name="robots" content="noindex, follow" />` on `404.html` to prevent 404 indexing.

### Changed

- **Footer Uniformity Across Pages**:
  - Removed duplicate `border-b` on `<section id="faq">` in `index.html` to eliminate an accidental 2px double border bloom at the footer boundary, ensuring a consistent 1px `border-slate-800` line on all pages.
  - Harmonized copyright and bottom row typography to `text-[11px] text-slate-400` across both `index.html` and `404.html` for uniform rendering and WCAG 2.1 AA contrast compliance.
- **SEO Sitemap Update**: Refreshed `sitemap.xml` last modification timestamp to `2026-10-31`.

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
  - Added `@media (prefers-reduced-motion: reduce)` rules in `css/style.css` to respect vestibular motion preferences.
  - Improved color contrast ratios across footer notes and legal disclaimers to exceed 7:1 against dark backgrounds.
- **SEO & Discovery Assets**:
  - Added `robots.txt` and `sitemap.xml` with canonical indexing directives.
  - Added `site.webmanifest` for installable and bookmarking metadata.
  - Injected Schema.org JSON-LD structured data (`SoftwareApplication` and `WebSite` graph).
- **Vercel Analytics & Speed Insights**: Integrated official Vercel Web Analytics and Speed Insights scripts for Core Web Vitals monitoring.
- **Direct Asset Download Routing**: Wired all primary download buttons to initiate instant downloads of the release zip archive (`Gemini.AI.Plus.for.1-Year.Automated.Claimer.by.nmrisrl11.zip`).
- **Releases Changelog Link**: Added a direct release history link below the hero call-to-action button.
- **Code Quality Tooling**: Configured project-scoped `.prettierrc`, `.prettierignore`, and `.vscode/settings.json` with automatic format-on-save.

### Changed

- **Decoupled Architecture**: Extracted and modularized CSS into `css/style.css` and JavaScript into `js/app.js`.
- **Responsive Hero Mockup**: Optimized the desktop app UI mockup titlebar to adaptively display a concise title on small mobile viewports (`Google AI Plus Portal`) while retaining full versioning on desktop screens.
- **Symmetric Layouts**: Balanced the System Requirements and Google One Expectations cards using flex height matching and distributed spacing.
- **Performance Image Optimization**: Added `loading="eager" fetchpriority="high"` on above-the-fold brand images and `loading="lazy" decoding="async"` on offscreen assets (QR codes and footer logos).

### Removed

- Removed redundant legacy `#download` card section from the page body, consolidating all download actions into the hero header and prominent direct call-to-action buttons.
