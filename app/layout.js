import { Manrope } from 'next/font/google';

import '@/app/_styles/globals.css';
import Header from './_components/Header';
import Footer from './_components/Footer';
import { Toaster } from 'react-hot-toast';

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
			<body className={`${manrope.className} flex h-screen flex-col bg-beige text-textdark`}>
				<Header />
				<main className="flex-1 pt-[80px]">{children}</main>
				<Footer />
				<Toaster
					position="top-center"
					gutter={12}
					containerStyle={{ margin: '8px' }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							fontSize: '16px',
							maxWidth: '500px',
							padding: '16px 24px',
							backgroundColor: 'white',
							color: 'black',
						},
					}}
				/>
			</body>
		</html>
	);
}
