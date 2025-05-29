'use client';

import Link from 'next/link';
import { signupUser } from '../_lib/actions';

export default function SignupForm() {
	return (
		<div className="flex flex-col items-center justify-center rounded-2xl border border-black shadow">
			<div className="w-full max-w-sm rounded-lg p-8">
				<h2 className="mb-6 text-center text-2xl font-bold text-textdark">Create an account</h2>

				<form action={signupUser} className="space-y-4">
					<input
						type="text"
						name="name"
						placeholder="Full Name"
						required
						className="w-full border-b border-black bg-beige p-2 focus:outline-none"
					/>
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
					<input
						type="password"
						name="passwordConfirm"
						placeholder="Confirm Password"
						required
						className="w-full border-b border-black bg-beige p-2 focus:outline-none"
					/>
					<button
						type="submit"
						className="w-full rounded-md bg-orange py-2 font-medium text-white transition hover:opacity-90"
					>
						Create an account
					</button>
				</form>

				<p className="mt-4 text-center text-sm text-gray-600">
					Already have an account?{' '}
					<Link href="/login" className="text-orange hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}
