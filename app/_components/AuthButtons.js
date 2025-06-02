import Link from 'next/link';
import LogoutForm from './LogoutForm';

function AuthButtons({ user }) {
	const firstName = user?.name?.split(' ').at(0);

	return (
		<div>
			{user ? (
				<div className="flex items-center gap-4">
					<img
						src={user.photo}
						alt={user.name}
						className="h-8 w-8 rounded-full"
						referrerPolicy="no-referrer"
					/>
					<Link
						href="/profile"
						className="rounded-full px-2 py-2 text-sm text-textdark transition hover:bg-lightgray sm:text-lg"
					>
						{firstName}
					</Link>

					<LogoutForm user={user} />
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
						className="rounded-full bg-orange px-4 py-2 text-sm text-white transition hover:opacity-90 sm:text-lg"
					>
						Sign up
					</Link>
				</div>
			)}
		</div>
	);
}

export default AuthButtons;
