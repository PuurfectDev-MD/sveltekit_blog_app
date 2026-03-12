import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				eagle: ['EagleLake', 'serif'],
				lily_script: ['LilyScriptOne', 'serif'],
			}
		}
	},

	plugins: []
} as Config;
