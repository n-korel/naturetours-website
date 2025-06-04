'use client';

import { useState } from 'react';

export default function PasswordProfileForm() {
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		setLoading(false);

		if (result.success) {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
	};
	return (
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
						name="name"
						type="text"
						value="test"
						className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-600">New password</label>
					<input
						name="email"
						type="email"
						value="test"
						className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-600">Confirm password</label>
					<input
						name="email"
						type="email"
						value="test"
						className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
					/>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						disabled={loading}
						className="mt-4 w-40 rounded-3xl bg-orange py-3 font-semibold text-white transition hover:bg-opacity-90"
					>
						{loading ? 'Saving...' : 'Save changes'}
					</button>
				</div>
			</div>
		</form>
	);
}
