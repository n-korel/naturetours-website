'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
	const pathname = usePathname();

	return (
		<nav>
			<ul className="flex gap-6 text-lg font-medium text-textdark">
				<li>
					<Link
						href="/"
						className={clsx(
							'transition hover:text-orange',
							pathname === '/' && 'font-semibold text-orange',
						)}
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						href="/tours"
						className={clsx(
							'transition hover:text-orange',
							pathname === '/tours' && 'font-semibold text-orange',
						)}
					>
						All Tours
					</Link>
				</li>
				<li>
					<Link
						href="/guides"
						className={clsx(
							'transition hover:text-orange',
							pathname === '/guides' && 'font-semibold text-orange',
						)}
					>
						Our Guides
					</Link>
				</li>
				<li>
					<Link
						href="/reviews"
						className={clsx(
							'transition hover:text-orange',
							pathname === '/reviews' && 'font-semibold text-orange',
						)}
					>
						Reviews
					</Link>
				</li>
				<li>
					<Link
						href="/faq"
						className={clsx(
							'transition hover:text-orange',
							pathname === '/faq' && 'font-semibold text-orange',
						)}
					>
						FAQ
					</Link>
				</li>
			</ul>
		</nav>
	);
}
