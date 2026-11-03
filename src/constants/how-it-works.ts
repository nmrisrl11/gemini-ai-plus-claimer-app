/**
 * How It Works Section Constants & Pipeline Steps
 * Centralized data structures for the 5-step provisioning pipeline.
 */

export type PipelineStepIcon = "user-check" | "terminal" | "mail-check" | "link" | "sparkles";

export interface PipelineStep {
	step: string;
	title: string;
	description: string;
	tag: string;
	icon: PipelineStepIcon;
}

export const PIPELINE_STEPS: PipelineStep[] = [
	{
		step: "01",
		title: "Profile Setup",
		description:
			"Configure your student details or click Randomize Info to generate compliant academic demographic records.",
		tag: "Input validation",
		icon: "user-check",
	},
	{
		step: "02",
		title: "Headless Engine",
		description:
			"Click Get 1-Year Access Link. The app silently navigates the partner registration portal in the background.",
		tag: "Playwright engine",
		icon: "terminal",
	},
	{
		step: "03",
		title: "Email Verification",
		description:
			"When prompted, complete the email confirmation received in your inbox. Clean input sanitization protects your session.",
		tag: "Human-in-the-loop",
		icon: "mail-check",
	},
	{
		step: "04",
		title: "Link Capture",
		description:
			"Captures the promotional grant, resolving nested redirect tokens to yield a clean official Google One offer link.",
		tag: "Canonical unwrapping",
		icon: "link",
	},
	{
		step: "05",
		title: "Access & Activate",
		description:
			"Proceed directly to Google One to complete setup. Session records and your permanent URL are archived locally in results/.",
		tag: "1-Year Activated",
		icon: "sparkles",
	},
];
