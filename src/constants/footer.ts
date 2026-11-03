import { CONFIG } from "../config";

/**
 * Footer Section Constants
 * Centralized data structures for categorized footer links and status indicators.
 */

export interface FooterLink {
	label: string;
	href: string;
	external?: boolean;
}

export interface FooterColumn {
	title: string;
	links: FooterLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
	{
		title: "Product",
		links: [
			{ label: "The 5-Step Pipeline", href: "#how-it-works" },
			{ label: "Multi-Browser Engine", href: "#browsers" },
			{ label: "Engineering Highlights", href: "#features" },
			{ label: "System Requirements", href: "#requirements" },
			{ label: "Frequently Asked Questions", href: "#faq" },
		],
	},
	{
		title: "Resources & Code",
		links: [
			{ label: "GitHub Repository", href: CONFIG.REPO_URL, external: true },
			{ label: "Releases & Changelog", href: CONFIG.RELEASES_URL, external: true },
			{
				label: "Download Latest (.exe)",
				href: CONFIG.LATEST_RELEASE_URL,
				external: true,
			},
			{
				label: "Report an Issue",
				href: `${CONFIG.REPO_URL}/issues`,
				external: true,
			},
		],
	},
	{
		title: "Developer & Support",
		links: [
			{ label: "Developer Profile", href: CONFIG.DEV_GITHUB, external: true },
			{ label: "Personal Portfolio", href: CONFIG.DEV_URL, external: true },
			{ label: "Buy Me a Coffee", href: CONFIG.BMC_URL, external: true },
			{ label: "Support Channels (GCash)", href: "#support" },
		],
	},
];
