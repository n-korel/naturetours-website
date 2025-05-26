'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
	{
		name: 'Home',
		href: '/',
	},
	{
		name: 'All Tours',
		href: '/tours',
	},
	{
		name: 'Our Guides',
		href: '/guides',
	},
	{
		name: 'Reviews',
		href: '/reviews',
	},
	{
		name: 'FAQ',
		href: '/faq',
	},
];

export default function Navigation() {
	const pathname = usePathname();

	return (
		<nav>
			<ul className="flex gap-6 text-lg font-medium text-textdark">
				{navLinks.map((link) => (
					<li key={link.name}>
						<Link
							href={link.href}
							className={clsx(
								'transition hover:text-orange',
								pathname === link.href && 'font-semibold text-orange',
							)}
						>
							<span>{link.name}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
