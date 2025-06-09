'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutForm from './LogoutForm';

function AuthButtons({ user }) {
	const pathname = usePathname();
	const firstName = user?.name?.split(' ').at(0);

	return (
		<div>
			{user ? (
				<div className="flex items-center gap-3">
					<Link
						href="/profile"
						className={`${pathname === '/profile' ? 'font-semibold text-orange' : 'text-textdark'} rounded-full px-4 py-2 text-sm transition hover:bg-lightgray hover:text-orange sm:text-lg`}
					>
						<div className="flex items-center justify-center gap-3">
							<img
								src={user.photo}
								alt={user.name}
								className="h-10 w-10 rounded-full"
								referrerPolicy="no-referrer"
							/>
							{firstName}
						</div>
					</Link>

					<LogoutForm />
				</div>
			) : (
				<div>
					<Link
						href="/login"
						className="rounded-full px-4 py-2 text-sm text-textdark transition hover:bg-lightgray sm:text-lg"
					>
						Login
					</Link>
					<Link
						href="/signup"
						className="rounded-full bg-orange px-4 py-2 text-sm text-white transition hover:opacity-80 sm:text-lg"
					>
						Sign up
					</Link>
				</div>
			)}
		</div>
	);
}

export default AuthButtons;
