'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation({ user }) {
	const pathname = usePathname();

	return (
		<div className="flex gap-6 text-lg font-medium">
			<Link
				href="/"
				className={`${pathname === '/' ? 'font-semibold text-orange' : 'text-textdark'} transition hover:text-orange`}
			>
				<span>Home</span>
			</Link>

			<Link
				href="/tours"
				className={`${pathname === '/tours' ? 'font-semibold text-orange' : 'text-textdark'} transition hover:text-orange`}
			>
				<span>All Tours</span>
			</Link>

			<Link
				href="/booking"
				className={`${pathname === '/booking' ? 'font-semibold text-orange' : 'text-textdark'} transition hover:text-orange`}
			>
				<span>Booking</span>
			</Link>

			<Link
				href="/reviews"
				className={`${pathname === '/reviews' ? 'font-semibold text-orange' : 'text-textdark'} transition hover:text-orange`}
			>
				<span>Reviews</span>
			</Link>

			<Link
				href="/faq"
				className={`${pathname === '/faq' ? 'font-semibold text-orange' : 'text-textdark'} transition hover:text-orange`}
			>
				<span>FAQ</span>
			</Link>
		</div>
	);
}
