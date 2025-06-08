import LoginForm from '../_components/LoginForm';

export const metadata = {
	title: 'Log in',
};

export default function Page() {
	return (
		<div className="flex h-full items-center justify-center pt-[80px]">
			<LoginForm />
		</div>
	);
}
