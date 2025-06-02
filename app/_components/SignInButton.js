import { signInAction } from '../_lib/actions';

function SignInButton() {
	return (
		<form action={signInAction}>
			<button className="flex items-center font-medium">
				<img
					src="https://authjs.dev/img/providers/google.svg"
					alt="Google logo"
					height="24"
					width="24"
				/>
				<span>Continue with Google</span>
			</button>
		</form>
	);
}

export default SignInButton;
