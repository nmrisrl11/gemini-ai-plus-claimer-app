/**
 * Multi-Browser Compatibility Section Constants
 * Centralized data structures for the 5-tier Chromium discovery cascade.
 */

export type BrowserIcon = "globe" | "shield-check" | "zap" | "app-window";

export interface BrowserTier {
	id: string;
	name: string;
	tier: string;
	tierBadge: string;
	description: string;
	engineLabel: string;
	engineValue: string;
	icon: BrowserIcon;
}

export interface CascadeStep {
	step: string;
	label: string;
}

export const BROWSER_TIERS: BrowserTier[] = [
	{
		id: "chrome",
		name: "Google Chrome",
		tier: "01",
		tierBadge: "Primary Target",
		description:
			"Direct headless connection via standard Chrome distribution channels for maximum execution speed and native account compatibility.",
		engineLabel: "Channel",
		engineValue: "chrome",
		icon: "globe",
	},
	{
		id: "edge",
		name: "Microsoft Edge",
		tier: "02",
		tierBadge: "OS Built-in",
		description:
			"Pre-installed on 100% of Windows 10 & 11 PCs. Guarantees the portal runs out of the box with zero runtime dependencies or manual downloads.",
		engineLabel: "Channel",
		engineValue: "msedge",
		icon: "shield-check",
	},
	{
		id: "brave",
		name: "Brave Browser",
		tier: "03",
		tierBadge: "Privacy Engine",
		description:
			"Deep executable path resolution for privacy-first developers running Brave as their default Windows browser. Shields-ready headless automation.",
		engineLabel: "Detection",
		engineValue: "Brave.exe",
		icon: "zap",
	},
	{
		id: "community",
		name: "Opera & Vivaldi",
		tier: "04",
		tierBadge: "Extended Chromium",
		description:
			"Automatic user AppData and Program Files directory scanning for Chromium-powered community and specialized power-user browsers.",
		engineLabel: "Scanning",
		engineValue: "Auto-Detected",
		icon: "app-window",
	},
];

export const CASCADE_STEPS: CascadeStep[] = [
	{ step: "01", label: "Chrome" },
	{ step: "02", label: "Edge" },
	{ step: "03", label: "Brave" },
	{ step: "04", label: "Opera / Vivaldi" },
	{ step: "05", label: "Playwright Cache" },
];
