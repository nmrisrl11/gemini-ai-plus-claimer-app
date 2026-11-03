/**
 * Why Automate Section Constants & Comparison Data
 * Centralized data structures for the comparison matrix.
 */

export interface ComparisonRow {
	id: string;
	label: string;
	manual: string;
	portal: string;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
	{
		id: "onboarding",
		label: "Demographic Setup",
		manual: "Tedious manual entry of student records, institutions, and regional phone formats.",
		portal: "1-click demographic randomization with automatic validation for compliant inputs.",
	},
	{
		id: "execution",
		label: "Browser Engine",
		manual: "Manual tab-switching, juggling windows, and repeatedly reloading verification pages.",
		portal: "Runs headless in the background via Playwright, attaching to your installed browser.",
	},
	{
		id: "verification",
		label: "Verification Flow",
		manual:
			"Fragile partner web forms that frequently timeout while waiting for incoming confirmation emails.",
		portal: "Human-in-the-loop: Prompts cleanly only when email confirmation is needed.",
	},
	{
		id: "extraction",
		label: "Link Capture",
		manual:
			"Manually copying nested URL query parameters and dealing with expiring partner redirects.",
		portal:
			"Resolves the official Google One offer link and archives it to your local results folder.",
	},
];

export const COMPARISON_SUMMARY = {
	manual: {
		title: "The Manual Method",
		badge: "Traditional Browser Flow",
		timeMetric: "8–15 mins of repetitive clicking",
	},
	portal: {
		title: "The Google AI Plus Portal Way",
		badge: "Local Playwright Automation",
		timeMetric: "~45 seconds",
	},
} as const;
