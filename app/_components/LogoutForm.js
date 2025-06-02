import { logoutUser, signOutAction } from '../_lib/actions';

function LogoutForm({ user }) {
	return (
		<div>
			{user.from === 'nextauth' ? (
				<form action={signOutAction}>
					<button className="rounded-full bg-orange px-4 py-2 text-sm text-white transition hover:opacity-90 sm:text-lg">
						Logout
					</button>
				</form>
			) : (
				<form action={logoutUser}>
					<button className="rounded-full bg-orange px-4 py-2 text-sm text-white transition hover:opacity-90 sm:text-lg">
						Logout
					</button>
				</form>
			)}
		</div>
	);
}

export default LogoutForm;
