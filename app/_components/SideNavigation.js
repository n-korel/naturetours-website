'use client';

import { Calendar, Star, User2Icon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
	{
		name: 'Profile',
		href: '/profile',
		icon: <User2Icon className="text-primary-600 h-5 w-5" />,
	},
	{
		name: 'My bookings',
		href: '/profile/mybookings',
		icon: <Calendar className="text-primary-600 h-5 w-5" />,
	},
	{
		name: 'My reviews',
		href: '/profile/myreviews',
		icon: <Star className="text-primary-600 h-5 w-5" />,
	},
];

function SideNavigation() {
	const pathname = usePathname();

	return (
		<nav className="">
			<ul className="flex flex-col gap-2">
				{navLinks.map((link) => (
					<li key={link.name}>
						<Link
							className={`${
								pathname === link.href ? 'bg-orange' : 'bg-lightgray'
							} hover:text-primary-100 flex items-center gap-2 rounded-2xl border border-slate-400 px-3 py-3 text-base font-semibold shadow transition-colors hover:bg-orange`}
							href={link.href}
						>
							{link.icon}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default SideNavigation;
