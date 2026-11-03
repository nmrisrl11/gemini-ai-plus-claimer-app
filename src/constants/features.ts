/**
 * Features Section Constants
 * Centralized data structures for the engineering highlights grid.
 */

export type FeatureIcon =
	| "layers"
	| "shield-check"
	| "link"
	| "mail"
	| "triangle-alert"
	| "terminal";

export interface FeatureItem {
	id: string;
	title: string;
	description: string;
	tag: string;
	metaLabel: string;
	metaValue: string;
	icon: FeatureIcon;
}

export const ENGINEERING_FEATURES: FeatureItem[] = [
	{
		id: "multi-browser",
		title: "Intelligent Multi-Browser Cascade",
		description:
			"No Python or manual browser downloads required. Intelligently cascades across Google Chrome, native Microsoft Edge, Brave Browser, Opera, and Vivaldi already on your system, avoiding 400MB bundled downloads.",
		tag: "Playwright Engine",
		metaLabel: "Engines",
		metaValue: "Chrome • Edge • Brave",
		icon: "layers",
	},
	{
		id: "local-private",
		title: "100% Local & Private",
		description:
			"No cloud relays, proxies, or remote APIs. Session records, demographic profiles, and output URLs are written strictly to the local results/ folder on your drive and never transmitted externally.",
		tag: "Zero Telemetry",
		metaLabel: "Storage",
		metaValue: "Local FS Only",
		icon: "shield-check",
	},
	{
		id: "canonical-extraction",
		title: "Canonical Link Extraction",
		description:
			"Unwraps session tokens and authentication redirection wrappers to deliver a clean, permanent official Google One offer link that can be redeemed anytime in your browser.",
		tag: "Direct Handshake",
		metaLabel: "Output",
		metaValue: "Canonical URL",
		icon: "link",
	},
	{
		id: "dual-delivery",
		title: "Dual Delivery Architecture",
		description:
			"Handles direct on-screen promotional offers as well as accounts where the partner dispatches activation emails directly to the inbox, providing clear status guidance for both paths.",
		tag: "Multi-Route",
		metaLabel: "Delivery",
		metaValue: "Direct + Email",
		icon: "mail",
	},
	{
		id: "challenge-safety",
		title: "Smart Error & Challenge Safety",
		description:
			"Proactively detects Cloudflare Turnstile, reCAPTCHA, and gateway stops. Safely pauses execution with clear on-screen diagnostics to protect accounts from lockouts.",
		tag: "Active Guard",
		metaLabel: "Detection",
		metaValue: "Turnstile Safe",
		icon: "triangle-alert",
	},
	{
		id: "built-in-diagnostics",
		title: "Built-in Diagnostics (F12)",
		description:
			"Includes an integrated testing suite allowing developers to simulate verification flows, gateway responses, and link extraction states safely without live partner requests.",
		tag: "DevTools",
		metaLabel: "Hotkey",
		metaValue: "F12 / Simulation",
		icon: "terminal",
	},
];
