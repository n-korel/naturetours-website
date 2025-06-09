import { logoutUser } from '../_lib/actions';

function LogoutForm() {
	return (
		<div>
			<form action={logoutUser}>
				<button className="rounded-full bg-orange px-4 py-2 text-sm text-white transition hover:opacity-80 sm:text-lg">
					Logout
				</button>
			</form>
		</div>
	);
}

export default LogoutForm;
