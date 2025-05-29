'use client';

import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoginUser } from '../_lib/actions';

export default function LoginForm() {
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.target);
		const result = await LoginUser(formData);

		setLoading(false);

		if (result.success) {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center rounded-2xl border border-black shadow">
			<div className="w-full max-w-sm rounded-lg p-8">
				<h2 className="mb-6 text-center text-2xl font-bold text-textdark">Welcome Back</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						name="email"
						placeholder="Email"
						required
						className="w-full border-b border-black bg-beige p-2 focus:outline-none"
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						required
						className="w-full border-b border-black bg-beige p-2 focus:outline-none"
					/>

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-md bg-orange py-2 font-medium text-white transition hover:opacity-90"
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>

				<p className="mt-4 text-center text-sm text-gray-600">
					Don&apos;t have an account?{' '}
					<Link href="/signup" className="text-orange hover:underline">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}
