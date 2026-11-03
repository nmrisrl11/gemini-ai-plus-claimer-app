/**
 * System Requirements & Guidelines Constants
 * Centralized data structures for system specs and redemption rules.
 */

export interface SystemSpec {
	label: string;
	value: string;
	mono?: boolean;
}

export interface RedemptionGuideline {
	step: string;
	title: string;
	description: string;
}

export const SYSTEM_SPECS: SystemSpec[] = [
	{
		label: "Operating System",
		value: "Windows 10 / 11 (64-bit)",
		mono: true,
	},
	{
		label: "Browser Engine",
		value: "Chromium (Chrome, Edge, Brave, Opera, Vivaldi)",
		mono: false,
	},
	{
		label: "Python Runtime",
		value: "Self-contained (Zero external dependencies)",
		mono: false,
	},
	{
		label: "Account Type",
		value: "Standard personal Google account (@gmail.com)",
		mono: false,
	},
	{
		label: "Distribution",
		value: "Single-file portable executable (.exe)",
		mono: true,
	},
];

export const REDEMPTION_GUIDELINES: RedemptionGuideline[] = [
	{
		step: "01",
		title: "$0.00 Identity Verification",
		description:
			"Activating promotional Google One subscriptions requires establishing a valid billing profile for account identity verification. You are charged $0.00 today; recurring preferences can be canceled anytime in your Google account settings.",
	},
	{
		step: "02",
		title: "Personal Accounts Only",
		description:
			"Destination accounts must be personal Google accounts in good standing. Enterprise Workspace domains or accounts with an active paid Google One subscription cannot accept promotional links until active plans are canceled.",
	},
	{
		step: "03",
		title: "Single-Use Grant Links",
		description:
			"Each extracted link is unique, single-use, and bound to the active registration session. Upstream partner availability and regional redemption rules apply.",
	},
];
