/**
 * FAQ Section Constants
 * Centralized data structures for frequently asked questions and answers.
 */

export interface FAQItem {
	id: string;
	question: string;
	answer: string;
	highlight?: string;
}

export const FAQ_ITEMS: FAQItem[] = [
	{
		id: "01",
		question: "How does the tool ensure privacy and local execution?",
		answer:
			"100% local. The application operates completely on your machine with zero outbound relays, proxy tunnels, or analytics telemetry. All session tokens, demographic records, and redemption links are archived solely in your local results/ directory.",
	},
	{
		id: "02",
		question: "How does the automated browser handle verification prompts?",
		answer:
			"During educational onboarding, the platform sends a confirmation message to your mailbox to verify account ownership. The desktop app safely pauses in a human-in-the-loop state with clear input sanitization. Once you enter the verification code, automation resumes instantly.",
	},
	{
		id: "03",
		question: "Why does Google One require verification during promotional activation?",
		answer:
			"This is an official Google One subscription requirement. Google One policy requires a valid billing method to verify identity. You are billed $0.00 today for the promotional tier, and recurring preferences can be modified or disabled anytime in your Google account settings.",
	},
	{
		id: "04",
		question: "What if a Cloudflare or reCAPTCHA verification challenge appears?",
		answer:
			"The engine actively monitors for gateway and Cloudflare Turnstile challenges. If a challenge is detected, automation safely yields control and pauses to prevent account lockouts, allowing you to resolve the challenge interactively before proceeding.",
	},
	{
		id: "05",
		question: "Do I need to install Python, Node, or Playwright browser binaries?",
		answer:
			"No. The standalone portable application bundles all execution components. It discovers and attaches directly to your pre-installed Google Chrome, Microsoft Edge, or Brave browser, saving over 400MB of external browser downloads.",
	},
];
