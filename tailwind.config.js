/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				beige: '#F4F1EC',
				orange: '#F65C27',
				forest: '#223820',
				lightgreen: '#DBE0D8',
				peach: '#FFD9B5',
				lightgray: '#ECEAE5',
				textdark: '#333333',
			},
		},
	},
	plugins: [],
};
