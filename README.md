# Google AI Plus Portal — Official Web Hub & Distribution

[![Live Deployment: Vercel](https://img.shields.io/badge/deployment-Vercel-000000?style=flat-square&logo=vercel)](https://gemini-ai-plus-claimer.vercel.app/)
[![Platform: Windows 10 / 11](<https://img.shields.io/badge/platform-Windows%2010%20%2F%2011%20(64--bit)-0284c7?style=flat-square&logo=windows>)](https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases)
[![Version: v1.0.0](https://img.shields.io/badge/release-v1.0.0-38bdf8?style=flat-square&logo=github)](https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases/tag/v1.0.0)
[![WCAG 2.1 AA Compliant](https://img.shields.io/badge/accessibility-WCAG%202.1%20AA-10b981?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Telemetry: Zero](<https://img.shields.io/badge/telemetry-Zero%20(100%25%20Local)-10b981?style=flat-square>)](#-privacy--local-execution)

Official landing page and release distribution portal for **Google AI Plus Portal** — a lightweight, zero-telemetry Windows desktop utility engineered to automate promotional student onboarding and capture the canonical Google One offer link (`https://one.google.com/offer/...`) for 12 months of complimentary Gemini Advanced and 2TB cloud storage.

🌐 **Live Web Hub**: [https://gemini-ai-plus-claimer.vercel.app](https://gemini-ai-plus-claimer.vercel.app/)  
📦 **Official Release (v1.0.0)**: [https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases/tag/v1.0.0](https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases/tag/v1.0.0)

---

## 📁 Repository Structure

```
gemini-ai-plus-claimer-app/
├── index.html          # Semantic, accessible landing page (Tailwind CSS CDN)
├── robots.txt          # Search engine crawler directives & sitemap reference
├── sitemap.xml         # XML sitemap for SEO discovery
├── site.webmanifest    # Web app manifest for installable/bookmark metadata
├── README.md           # Project documentation and deployment guide
├── CHANGELOG.md        # Comprehensive version history & release changelog
├── .prettierrc         # Project-level Prettier code formatting rules
├── .prettierignore     # Files excluded from Prettier formatting
├── .gitignore          # Git exclusion rules
├── .vscode/
│   ├── settings.json   # Workspace editor formatting rules (formatOnSave)
│   └── extensions.json # Recommended VS Code extensions (Prettier, Tailwind)
├── css/
│   └── style.css       # Custom scrollbars, focus rings & prefers-reduced-motion
├── js/
│   └── app.js          # Direct download routing, mobile drawer, a11y live announcer
└── images/
    ├── app_icon.ico    # Multi-resolution Windows application icon
    ├── app_icon.png    # High-resolution brand icon (512x512)
    ├── og-image.png    # Official 1200x630 OpenGraph & Twitter social preview banner
    ├── qrcode-bmc.png  # Buy Me a Coffee donation QR code
    ├── qrcode-gcash.JPG# GCash donation QR code
    └── shuffle.png     # UI accessory icon
```

---

## ⚡ Key Features of the Landing Page

### 1. Direct Release Download Integration

- **One-Click Distribution**: All primary download buttons trigger instant download of the release archive (`Gemini.AI.Plus.for.1-Year.Automated.Claimer.by.nmrisrl11.zip`) directly from GitHub Releases rather than forcing extra navigation hops.
- **Releases Hub Link**: Direct shortcut to the GitHub Releases changelog beneath the hero call-to-action.

### 2. Accessibility (WCAG 2.1 AA Compliance)

- **Bypass Blocks (`2.4.1`)**: Accessible keyboard "Skip to main content" link placed at the top of `<body>`.
- **Landmark Regions**: Proper semantic structure using `<header role="banner">`, `<main id="main-content">`, `<footer role="contentinfo">`, and uniquely labeled navigation regions.
- **Screen Reader Announcer (`4.1.3`)**: Dynamic `aria-live="polite"` region alerts assistive tech users when code snippets or hashes are copied to clipboard.
- **Sanitized Decorative SVGs (`1.1.1`)**: All decorative inline SVGs contain `aria-hidden="true" focusable="false"`.
- **Reduced Motion (`2.3.3` & `2.2.2`)**: Media queries automatically disable smooth scrolling and blinking cursors for visitors with vestibular motion sensitivities.
- **High-Contrast Palette (`1.4.3`)**: All body and disclaimer typography exceeds 7:1 contrast ratios on dark slate backgrounds.

### 3. SEO & Rich Social Previews

- **High-Resolution OpenGraph & Twitter Cards**: 1200&times;630 `og:image` and `summary_large_image` Twitter card for rich previews on Discord, Telegram, X, and Slack.
- **Structured Data (JSON-LD)**: `SoftwareApplication` and `WebSite` schemas providing Google with software version, license price ($0.00), OS compatibility, and author details for rich search snippets.
- **Search Engine Discoverability**: Deployed `robots.txt` and `sitemap.xml` referencing canonical URLs.

### 4. Telemetry & Speed Insights

- Integrated **Vercel Web Analytics** (`/_vercel/insights/script.js`) for privacy-friendly traffic analysis.
- Integrated **Vercel Speed Insights** (`/_vercel/speed-insights/script.js`) for real-user Core Web Vitals monitoring (LCP, FID, CLS).

---

## 🚀 Deployment (Vercel)

The landing page is optimized for instant static hosting on Vercel with zero build configurations required:

1. Connect `nmrisrl11/gemini-ai-plus-claimer-app` to your Vercel account.
2. Set Framework Preset to **Other** (Plain HTML).
3. The root directory `/` serves `index.html`, `css/`, `js/`, and `images/`.
4. Any push to `main` automatically triggers deployment and activates Vercel Analytics and Speed Insights.

---

## 📦 Release Package Details (v1.0.0)

| Attribute              | Specification                                                      |
| :--------------------- | :----------------------------------------------------------------- |
| **Release Version**    | `v1.0.0` (Stable)                                                  |
| **Release Archive**    | `Gemini.AI.Plus.for.1-Year.Automated.Claimer.by.nmrisrl11.zip`     |
| **Application Binary** | `Google AI Plus Portal v1.0.0.exe`                                 |
| **Target OS**          | Windows 10 / Windows 11 (64-bit)                                   |
| **Binary Size**        | ~58.5 MB (Single portable `.exe`)                                  |
| **SHA-256 Checksum**   | `3778FAAEAE423C199F1DA88E1DAF20E3FA2A3048C9880DE25B66A68FB3EB3E55` |

### Checksum Verification in PowerShell:

```powershell
Get-FileHash "Google AI Plus Portal v1.0.0.exe" -Algorithm SHA256
```

---

## 🛠️ Local Development & Code Quality

This project enforces strict code formatting using Prettier and VS Code editor hooks:

```bash
# Check formatting
npx prettier --check .

# Auto-format all files
npx prettier --write .
```

---

## ⚖️ Disclaimer & Non-Affiliation

This project is an independent utility provided strictly for convenience, personal educational testing, and research. This project is **not** affiliated with, sponsored by, or endorsed by Google LLC, Alphabet Inc., or Internshala. Google, Google One, and Gemini are trademarks of Google LLC.
