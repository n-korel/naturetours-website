'use client';

import toast from 'react-hot-toast';
import { updatePassword } from '../_lib/actions';
import SubmitButton from './SubmitButton';

export default function PasswordProfileForm() {
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const result = await updatePassword(formData);

		if (result.success) {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}

		e.target.reset();
	};

	return (
		<div className="rounded-2xl border border-slate-300 p-8 shadow-lg">
			<h2 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-left">
				Change Password
			</h2>

			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-600">Current password</label>
					<input
						name="passwordCurrent"
						type="password"
						required
						className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-600">New password</label>
					<input
						name="password"
						type="password"
						required
						className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-600">Confirm password</label>
					<input
						name="passwordConfirm"
						type="password"
						required
						className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
					/>
				</div>

				<div className="flex justify-end">
					<SubmitButton
						pendingLabel="Changing..."
						className="w-40 rounded-3xl bg-orange py-3 font-semibold text-white transition hover:bg-opacity-80 disabled:bg-opacity-80"
					>
						Change password
					</SubmitButton>
				</div>
			</form>
		</div>
	);
}
