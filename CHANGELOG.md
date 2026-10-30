# Changelog

All notable changes to the **Google AI Plus Portal** landing page and distribution hub will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
