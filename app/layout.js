import { Manrope } from 'next/font/google';

import '@/app/_styles/globals.css';
import Header from './_components/Header';
import Footer from './_components/Footer';

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
			<body className={`${manrope.className} bg-beige text-textdark min-h-screen flex flex-col`}>
				<Header />
				<main className="flex-1 pt-[80px]">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
