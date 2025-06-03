import ForgotPasswordForm from '../_components/ForgotPasswordForm';

export const metadata = {
	title: 'forgot Password',
};

export default function Page() {
	return (
		<div className="flex h-full items-center justify-center">
			<ForgotPasswordForm />
		</div>
	);
}
