'use client';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { forgotPassword } from '../_lib/actions';
import SubmitButton from './SubmitButton';

export default function ForgotPasswordForm() {
	const router = useRouter();

	async function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const result = await forgotPassword(formData);

		if (result.success) {
			toast.success(result.message);
			setTimeout(() => {
				router.push('/login');
			}, 1000);
		} else {
			toast.error(result.message);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center rounded-2xl border border-black shadow">
			<div className="w-full max-w-sm rounded-lg p-8">
				<h2 className="mb-6 text-center text-2xl font-bold text-textdark">Password reset</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						name="email"
						placeholder="Email"
						required
						className="w-full border-b border-black bg-beige p-2 focus:outline-none"
					/>

					<SubmitButton
						pendingLabel="Reseting..."
						className="w-full rounded-md bg-orange py-2 font-medium text-white transition hover:opacity-90"
					>
						Reset Password
					</SubmitButton>
				</form>
			</div>
		</div>
	);
}
