import Link from 'next/link';

function AuthButtons() {
	return (
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
	);
}

export default AuthButtons;
