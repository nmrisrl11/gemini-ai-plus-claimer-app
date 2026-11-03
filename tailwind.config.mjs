/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"Inter",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"Roboto",
					"sans-serif",
				],
				mono: ["JetBrains Mono", "Consolas", "Courier New", "monospace"],
			},
			colors: {
				slate: {
					850: "#131c2e",
					900: "#0f172a",
					950: "#090d16",
				},
				brand: {
					DEFAULT: "#0284c7",
					hover: "#0369a1",
					accent: "#38bdf8",
					glow: "rgba(2, 132, 199, 0.15)",
				},
			},
		},
	},
	plugins: [],
};
