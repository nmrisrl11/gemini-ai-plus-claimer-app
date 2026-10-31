/**
 * Google AI Plus Portal — Interactive Landing Page Script
 * Handles centralized release configuration, DOM synchronization, mobile navigation, and link adaptation.
 */

// Centralized Release Configuration
// Single source of truth: updating this object synchronizes all download buttons,
// release tags, and version badges across the entire website automatically.
const CONFIG = {
	VERSION: "v1.0.1",
	REPO_URL: "https://github.com/nmrisrl11/gemini-ai-plus-claimer-app",
	get DIRECT_DOWNLOAD_URL() {
		return `${this.REPO_URL}/releases/tag/${this.VERSION}`;
	},
	get RELEASES_URL() {
		return `${this.REPO_URL}/releases`;
	},
	get LATEST_RELEASE_URL() {
		return `${this.REPO_URL}/releases/latest`;
	},
};

// Wire all direct release download buttons
document.querySelectorAll(".direct-download-link").forEach((link) => {
	if (CONFIG.DIRECT_DOWNLOAD_URL) {
		link.href = CONFIG.DIRECT_DOWNLOAD_URL;
	}
});

// Wire releases hub links
document.querySelectorAll(".releases-link").forEach((link) => {
	if (CONFIG.RELEASES_URL) {
		link.href = CONFIG.RELEASES_URL;
	}
});

// Synchronize all version text elements across the page
document.querySelectorAll(".app-version-text").forEach((element) => {
	element.textContent = CONFIG.VERSION;
});

// Update Schema.org JSON-LD Structured Data if present
const schemaScript = document.getElementById("app-schema");
if (schemaScript) {
	try {
		const schema = JSON.parse(schemaScript.textContent);
		const appNode = schema["@graph"]?.find((item) => item["@type"] === "SoftwareApplication");
		if (appNode) {
			appNode.softwareVersion = CONFIG.VERSION.replace(/^v/, "");
			appNode.downloadUrl = CONFIG.DIRECT_DOWNLOAD_URL;
			schemaScript.textContent = JSON.stringify(schema, null, "\t");
		}
	} catch (e) {
		// Silent graceful fallback
	}
}

// Mobile Drawer Navigation
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIconBars = document.getElementById("menu-icon-bars");
const menuIconClose = document.getElementById("menu-icon-close");

if (mobileMenuBtn && mobileMenu) {
	mobileMenuBtn.setAttribute("aria-controls", "mobile-menu");

	mobileMenuBtn.addEventListener("click", () => {
		const isOpen = !mobileMenu.classList.contains("hidden");
		if (isOpen) {
			mobileMenu.classList.add("hidden");
			mobileMenuBtn.setAttribute("aria-expanded", "false");
			if (menuIconBars) menuIconBars.classList.remove("hidden");
			if (menuIconClose) menuIconClose.classList.add("hidden");
		} else {
			mobileMenu.classList.remove("hidden");
			mobileMenuBtn.setAttribute("aria-expanded", "true");
			if (menuIconBars) menuIconBars.classList.add("hidden");
			if (menuIconClose) menuIconClose.classList.remove("hidden");
		}
	});

	// Close drawer on link click
	document.querySelectorAll(".mobile-nav-link").forEach((link) => {
		link.addEventListener("click", () => {
			mobileMenu.classList.add("hidden");
			mobileMenuBtn.setAttribute("aria-expanded", "false");
			if (menuIconBars) menuIconBars.classList.remove("hidden");
			if (menuIconClose) menuIconClose.classList.add("hidden");
		});
	});

	// Close on Escape key press (keyboard accessibility)
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
			mobileMenu.classList.add("hidden");
			mobileMenuBtn.setAttribute("aria-expanded", "false");
			if (menuIconBars) menuIconBars.classList.remove("hidden");
			if (menuIconClose) menuIconClose.classList.add("hidden");
			mobileMenuBtn.focus();
		}
	});
}

// Universal Environment Link Adapter (Production Root vs Local File System)
// When browsing offline via file:// protocol, relative links like 'index.html#overview' work naturally.
// When deployed on live web hosts (Vercel) from nested paths (e.g. 404), ensure internal section anchors navigate cleanly to root '/#...'.
if (window.location.protocol === "http:" || window.location.protocol === "https:") {
	document.querySelectorAll('a[href^="index.html#"]').forEach((link) => {
		const hash = link.getAttribute("href").replace("index.html#", "#");
		if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
			link.setAttribute("href", hash);
		} else {
			link.setAttribute("href", "/" + hash);
		}
	});
}
