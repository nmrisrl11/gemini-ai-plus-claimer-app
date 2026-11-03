import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://gemini-ai-plus-claimer.vercel.app",
	output: "static",
	vite: {
		plugins: [tailwindcss()],
	},
});
