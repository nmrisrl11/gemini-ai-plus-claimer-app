import { CONFIG } from "../config";

export interface NavItem {
	label: string;
	href: string;
	section?: string;
	external?: boolean;
}

export interface ScrollspySection {
	id: string;
	tabKey: string;
}

/**
 * Primary segmented navigation items for the desktop navbar and mobile drawer
 */
export const NAV_ITEMS: NavItem[] = [
	{ label: "How It Works", href: "#how-it-works", section: "how-it-works" },
	{ label: "Features", href: "#features", section: "features" },
	{ label: "Compatibility", href: "#browsers", section: "browsers" },
	{ label: "FAQ", href: "#faq", section: "faq" },
];

/**
 * Additional secondary navigation links for the mobile drawer
 */
export const MOBILE_EXTRA_ITEMS: NavItem[] = [
	{ label: "Source Code", href: CONFIG.REPO_URL, external: true },
	{ label: "Support Dev", href: "#support", section: "support" },
];

/**
 * Section mapping for the continuous scrollspy engine
 */
export const SCROLLSPY_SECTIONS: ScrollspySection[] = [
	{ id: "how-it-works", tabKey: "how-it-works" },
	{ id: "features", tabKey: "features" },
	{ id: "browsers", tabKey: "browsers" },
	{ id: "requirements", tabKey: "browsers" },
	{ id: "faq", tabKey: "faq" },
];
