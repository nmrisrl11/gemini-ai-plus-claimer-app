# Google AI Plus Portal — Official Web Hub & Releases

[![Platform: Windows 10 / 11](https://img.shields.io/badge/platform-Windows%2010%20%2F%2011%20(64--bit)-0284c7?style=flat-square)](https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases)
[![Version: v1.0.0](https://img.shields.io/badge/version-v1.0.0-38bdf8?style=flat-square)](https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases)
[![Telemetry: Zero](https://img.shields.io/badge/telemetry-Zero%20(100%25%20Local)-10b981?style=flat-square)](#privacy--security)

Official landing page and release portal for **Google AI Plus Portal** — a native, privacy-focused Windows utility engineered to safely automate promotional student onboarding and capture the canonical Google One offer link (`https://one.google.com/offer/...`) for 12 months of complimentary Gemini Advanced and 2TB cloud storage.

---

## 📁 Repository Structure

```
gemini-ai-plus-claimer-app/
├── index.html        # Clean, responsive landing page (Tailwind CSS CDN)
├── css/
│   └── style.css     # Custom desktop slate styling, scrollbars & animations
├── js/
│   └── app.js        # Dynamic release link routing, tabs, clipboard, drawer
├── images/
│   ├── app_icon.ico  # Application multi-resolution Windows icon
│   ├── app_icon.png  # High-resolution application brand asset
│   ├── qrcode-bmc.png# Buy Me a Coffee QR asset
│   ├── qrcode-gcash.JPG# GCash QR asset
│   └── shuffle.png   # Utility asset
├── .gitignore        # Standard ignore rules (prevents tracking large binaries)
└── README.md         # Repository documentation
```

---

## 🚀 How to Host on GitHub Pages

This landing page has zero build dependencies (no Node.js or bundler required). To publish it live with GitHub Pages:

1. Push this repository to GitHub under `nmrisrl11/gemini-ai-plus-claimer-app`.
2. In the repository on GitHub, navigate to **Settings** &rarr; **Pages**.
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / folder `/ (root)`
4. Click **Save**. Within ~1 minute, your site will be live at:
   ```
   https://nmrisrl11.github.io/gemini-ai-plus-claimer-app/
   ```

---

## 📦 How to Publish Executable Releases

To provide the standalone portable `.exe` for users without bloating the Git repository:

1. Go to the **Releases** tab on GitHub:
   ```
   https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases
   ```
2. Click **Draft a new release**.
3. Set tag: `v1.0.0` (target: `main`).
4. Set release title: `Google AI Plus Portal v1.0.0 Portable`.
5. Attach the compiled executable:
   - `Google AI Plus Portal v1.0.0.exe` (~58.5 MB)
6. Publish the release. The landing page is already configured to point directly to:
   - Latest release page: `https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases`
   - Direct release asset: `https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases/latest`

---

## 🔐 Binary Verification

| Property | Value |
| :--- | :--- |
| **File Name** | `Google AI Plus Portal v1.0.0.exe` |
| **Target OS** | Windows 10 / 11 (64-bit) |
| **Architecture** | x86_64 Portable Executable |
| **SHA-256 Checksum** | `3778FAAEAE423C199F1DA88E1DAF20E3FA2A3048C9880DE25B66A68FB3EB3E55` |

Verify in Windows PowerShell:
```powershell
Get-FileHash "Google AI Plus Portal v1.0.0.exe" -Algorithm SHA256
```

---

## ⚖️ Disclaimer & Non-Affiliation

This project is an independent utility provided strictly for convenience, personal educational testing, and research. This project is **not** affiliated with, sponsored by, or endorsed by Google LLC, Alphabet Inc., or Internshala. All trademarks belong to their respective owners.
