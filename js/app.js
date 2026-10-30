/**
 * Google AI Plus Portal — Interactive Landing Page Script
 * Handles release linking, clipboard copy, usage tabs, and mobile navigation.
 */

// Configuration Object
// Points to the public release repository where portable binaries are hosted:
const CONFIG = {
  RELEASE_URL: "https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases",
  RELEASE_EXE_DIRECT: "https://github.com/nmrisrl11/gemini-ai-plus-claimer-app/releases/latest",
  DEVELOPER_PROFILE: "https://github.com/nmrisrl11",
  VERSION: "v1.0.0",
  FILE_NAME: "Google AI Plus Portal v1.0.0.exe",
  SHA256: "3778FAAEAE423C199F1DA88E1DAF20E3FA2A3048C9880DE25B66A68FB3EB3E55"
};

// Apply configured release links to all relevant anchors
document.querySelectorAll('.release-link').forEach(link => {
  if (CONFIG.RELEASE_URL) {
    link.href = CONFIG.RELEASE_URL;
  }
});

const mainDownloadBtn = document.getElementById('btn-download-exe');
if (mainDownloadBtn && CONFIG.RELEASE_EXE_DIRECT) {
  mainDownloadBtn.href = CONFIG.RELEASE_EXE_DIRECT;
}

// Tab Switching for Application Usage Modes
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');
    
    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('text-sky-400', 'border-sky-400', 'font-semibold');
      btn.classList.add('text-slate-400', 'border-transparent');
      btn.setAttribute('aria-selected', 'false');
    });

    // Activate clicked button
    button.classList.add('text-sky-400', 'border-sky-400', 'font-semibold');
    button.classList.remove('text-slate-400', 'border-transparent');
    button.setAttribute('aria-selected', 'true');

    // Hide all panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.add('hidden');
    });

    // Show target pane
    const activePane = document.getElementById(targetTab);
    if (activePane) {
      activePane.classList.remove('hidden');
    }
  });
});

// Checksum Copy Button
const btnCopyChecksum = document.getElementById('btn-copy-checksum');
if (btnCopyChecksum) {
  btnCopyChecksum.addEventListener('click', () => {
    navigator.clipboard.writeText(CONFIG.SHA256).then(() => {
      const textEl = btnCopyChecksum.querySelector('.copy-text');
      if (textEl) {
        const original = textEl.textContent;
        textEl.textContent = 'Copied!';
        btnCopyChecksum.classList.add('text-emerald-400');
        setTimeout(() => {
          textEl.textContent = original;
          btnCopyChecksum.classList.remove('text-emerald-400');
        }, 2000);
      }
    });
  });
}

// Mobile Drawer Navigation
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIconBars = document.getElementById('menu-icon-bars');
const menuIconClose = document.getElementById('menu-icon-close');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      menuIconBars.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    } else {
      mobileMenu.classList.remove('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      menuIconBars.classList.add('hidden');
      menuIconClose.classList.remove('hidden');
    }
  });

  // Auto-close mobile drawer when tapping any navigation anchor
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      menuIconBars.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    });
  });

  // Auto-close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      menuIconBars.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    }
  });
}

// Generic Code Snippet Copy function
function copySnippet(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('text-emerald-400');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('text-emerald-400');
    }, 2000);
  });
}
