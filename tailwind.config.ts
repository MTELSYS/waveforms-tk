import type { Config } from 'tailwindcss';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}', 
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	 plugins: [
		require('flowbite/plugin'),
		require('@tailwindcss/typography')
	 ],
} satisfies Config;

export default config;
