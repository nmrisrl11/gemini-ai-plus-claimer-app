/**
 * Hero Section Constants & Mock Data
 * Centralized data structures for Hero CTA specs, interactive mockup UI,
 * stepper progression, terminal instructions, and key technical guarantees.
 */

export const HERO_MICRO_SPECS = [
	"No installation needed",
	"Uses pre-installed Chrome or Edge",
	"100% Local execution",
] as const;

export interface MockProfileField {
	label: string;
	value: string;
	truncate?: boolean;
}

export const MOCK_PROFILE_FIELDS: MockProfileField[] = [
	{ label: "Candidate Name:", value: "Advik Malhotra" },
	{ label: "Institution:", value: "Engineering Institute" },
	{ label: "Academic Field:", value: "Computer Science", truncate: true },
	{ label: "Graduation Year:", value: "2026" },
	{ label: "Automation Engine:", value: "Auto Cascade (Chrome/Edge/Brave)" },
];

export interface MockStepperStep {
	step: number;
	label: string;
	active?: boolean;
}

export const MOCK_STEPPER_STEPS: MockStepperStep[] = [
	{ step: 1, label: "Profile Setup", active: true },
	{ step: 2, label: "Email Verification" },
	{ step: 3, label: "Access Link Ready" },
];

export const MOCK_TERMINAL_GUIDE_STEPS = [
	"1. Review or customize your account profile above.",
	'2. Click "Get 1-Year Access Link" to start provisioning.',
	"3. Complete the email confirmation step when prompted by the browser.",
	"4. Your 1-Year Google AI Plus activation link will be ready to use!",
] as const;

export type GuaranteeIconKey = "sparkles" | "shield" | "cpu" | "link";

export interface KeyGuarantee {
	id: string;
	title: string;
	description: string;
	icon: GuaranteeIconKey;
}

export const KEY_GUARANTEES: KeyGuarantee[] = [
	{
		id: "access",
		title: "12 Months Access",
		description: "Gemini Advanced & 2TB Storage",
		icon: "sparkles",
	},
	{
		id: "local",
		title: "100% Local Execution",
		description: "Zero telemetry or cloud relays",
		icon: "shield",
	},
	{
		id: "engine",
		title: "Zero-Bloat Engine",
		description: "Attaches to installed Edge or Chrome",
		icon: "cpu",
	},
	{
		id: "extract",
		title: "1-Click Extraction",
		description: "Canonical Google One offer link",
		icon: "link",
	},
];
