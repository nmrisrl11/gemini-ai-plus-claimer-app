/**
 * Google AI Plus Portal — Interactive Navbar Controller
 * Handles mobile drawer toggle, hysteresis scroll state, and scrollspy navigation.
 */
import { SCROLLSPY_SECTIONS } from "../constants/navigation";

export function initNavbar(): void {
	// Mobile Drawer Navigation toggle logic
	const mobileMenuBtn = document.getElementById("mobile-menu-btn");
	const mobileMenu = document.getElementById("mobile-menu");
	const menuIconBars = document.getElementById("menu-icon-bars");
	const menuIconClose = document.getElementById("menu-icon-close");

	if (mobileMenuBtn && mobileMenu) {
		mobileMenuBtn.addEventListener("click", (e) => {
			e.preventDefault();
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
		document.addEventListener("keydown", (e: KeyboardEvent) => {
			if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
				mobileMenu.classList.add("hidden");
				mobileMenuBtn.setAttribute("aria-expanded", "false");
				if (menuIconBars) menuIconBars.classList.remove("hidden");
				if (menuIconClose) menuIconClose.classList.add("hidden");
				mobileMenuBtn.focus({ preventScroll: true });
			}
		});
	}

	// Scrollspy & Hysteresis Scroll State (Flicker-Free)
	const sections = SCROLLSPY_SECTIONS;
	const navTabs = document.querySelectorAll<HTMLElement>(".nav-tab");
	const siteHeader = document.getElementById("site-header");

	const activeClasses = [
		"bg-slate-800",
		"text-white",
		"font-semibold",
		"shadow-sm",
		"border-slate-700/80",
	];
	const inactiveClasses = ["text-slate-400", "font-medium", "border-transparent"];

	function setActiveTab(activeKey: string): void {
		if (!navTabs.length) return;
		navTabs.forEach((tab) => {
			const target = tab.getAttribute("data-section");
			if (target === activeKey) {
				tab.classList.add(...activeClasses);
				tab.classList.remove(...inactiveClasses);
				tab.setAttribute("aria-current", "page");
			} else {
				tab.classList.remove(...activeClasses);
				tab.classList.add(...inactiveClasses);
				tab.removeAttribute("aria-current");
			}
		});
	}

	// Click activation (instant visual feedback)
	navTabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			const target = tab.getAttribute("data-section");
			if (target) setActiveTab(target);
		});
	});

	// Hysteresis threshold to eliminate chatter/flicker at the boundary
	let isScrolled = false;
	const SCROLL_ACTIVATE_PX = 50; // Enter scrolled state after 50px
	const SCROLL_DEACTIVATE_PX = 20; // Return to top state only when above 20px

	let isTicking = false;
	function updateOnScroll(): void {
		const scrollY = window.scrollY;
		const viewportHeight = window.innerHeight;
		const docHeight = document.documentElement.scrollHeight;

		// 1. Flicker-Free Hysteresis Scroll State
		if (siteHeader) {
			if (!isScrolled && scrollY > SCROLL_ACTIVATE_PX) {
				isScrolled = true;
				siteHeader.setAttribute("data-scrolled", "true");
			} else if (isScrolled && scrollY < SCROLL_DEACTIVATE_PX) {
				isScrolled = false;
				siteHeader.setAttribute("data-scrolled", "false");
			}
		}

		// 2. Scrollspy Section Highlight
		if (!navTabs.length) return;

		// If reached the very bottom of the page, highlight FAQ
		if (scrollY + viewportHeight >= docHeight - 80) {
			setActiveTab("faq");
			return;
		}

		// Header offset buffer
		const headerOffset = 140;
		const currentY = scrollY + headerOffset;

		// Check first section top
		const firstSection = document.getElementById("how-it-works");
		if (firstSection && currentY < firstSection.offsetTop) {
			setActiveTab("");
			return;
		}

		// Scan backwards to find the current active section
		let activeKey = "";
		for (let i = sections.length - 1; i >= 0; i--) {
			const item = sections[i];
			const el = document.getElementById(item.id);
			if (el && currentY >= el.offsetTop) {
				activeKey = item.tabKey;
				break;
			}
		}

		setActiveTab(activeKey);
	}

	window.addEventListener(
		"scroll",
		() => {
			if (!isTicking) {
				window.requestAnimationFrame(() => {
					updateOnScroll();
					isTicking = false;
				});
				isTicking = true;
			}
		},
		{ passive: true }
	);

	// Initial check on page load
	updateOnScroll();
}

// Automatically initialize when loaded or DOM ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initNavbar);
} else {
	initNavbar();
}
