import Logo from './_components/Logo';
import Navigation from './_components/Navigation';

import { Manrope } from 'next/font/google';

import '@/app/_styles/globals.css';

const manrope = Manrope({
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
	weight: '500',
});

export const metadata = {
	title: {
		template: '%s / Nature tours',
		default: 'Welcome / Nature tours',
	},
	description: 'Nature tours are simply a great activity for a weekend or vacation.',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${manrope.className} bg-beige text-textdark min-h-screen`}>
				<header>
					<Logo />
					<Navigation />
				</header>
				<main>{children}</main>
				<footer>by Nick Koreliskiy</footer>
			</body>
		</html>
	);
}
