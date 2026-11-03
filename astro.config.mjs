import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://gemini-ai-plus-claimer.vercel.app',
	output: 'static',
	vite: {
		plugins: [tailwindcss()],
	},
});
