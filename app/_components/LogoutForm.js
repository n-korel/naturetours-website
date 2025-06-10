import { logoutUser } from '../_lib/actions';
import SubmitButton from './SubmitButton';

function LogoutForm() {
	return (
		<div>
			<form action={logoutUser}>
				<SubmitButton
					pendingLabel="Logout"
					className="rounded-full bg-orange px-4 py-2 text-sm text-white transition hover:opacity-80 disabled:opacity-80 sm:text-lg"
				>
					Logout
				</SubmitButton>
			</form>
		</div>
	);
}

export default LogoutForm;
