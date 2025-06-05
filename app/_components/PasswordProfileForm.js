'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { updatePassword } from '../_lib/actions';

export default function PasswordProfileForm() {
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.target);
		const result = await updatePassword(formData);
		setLoading(false);

		if (result.success) {
			toast.success(result.message);
			e.target.reset();
		} else {
			toast.error(result.message);
			e.target.reset();
		}
	};
	return (
		<div className="rounded-2xl border border-slate-400 shadow">
			<form
				onSubmit={handleSubmit}
				className="mx-auto my-8 flex max-w-4xl flex-col items-center gap-12 md:flex-row"
			>
				<div className="flex w-full flex-col gap-6">
					<h2 className="text-center text-3xl font-bold text-gray-800 md:text-left">
						Password Change
					</h2>

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
						<button
							type="submit"
							disabled={loading}
							className="mt-4 w-40 rounded-3xl bg-orange py-3 font-semibold text-white transition hover:bg-opacity-80 disabled:bg-opacity-80"
						>
							{loading ? 'Changing...' : 'Change password'}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
