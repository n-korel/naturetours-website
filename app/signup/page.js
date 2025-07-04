export const dynamic = 'force-dynamic';
import SignupForm from '../_components/SignupForm';

export const metadata = {
	title: 'Sign up',
};

export default function Page() {
	return (
		<div className="flex h-full items-center justify-center pt-[80px]">
			<SignupForm />
		</div>
	);
}
