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
				primary: {
					200: '#B7C7D7',
					900: '#1B2631',
				},
				accent: {
					500: '#C69963',
					600: '#B78343',
				},
			},
			height: {
				screen: '100dvh',
			},
		},
	},
	plugins: [],
};
