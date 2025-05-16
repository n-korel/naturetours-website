'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
	const pathname = usePathname();

	return (
		<nav>
			<ul className="flex gap-6 text-lg text-textdark font-medium">
				<li>
					<Link
						href="/"
						className={clsx(
							'transition hover:text-orange',
							pathname === '/' && 'text-orange font-semibold',
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
							pathname === '/tours' && 'text-orange font-semibold',
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
							pathname === '/guides' && 'text-orange font-semibold',
						)}
					>
						Our Guides
					</Link>
				</li>
				<li>
					<Link
						href="/faq"
						className={clsx(
							'transition hover:text-orange',
							pathname === '/faq' && 'text-orange font-semibold',
						)}
					>
						FAQ
					</Link>
				</li>
			</ul>
		</nav>
	);
}
