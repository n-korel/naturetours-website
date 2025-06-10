'use client';

import { useRef } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { signupUser } from '../_lib/actions';
import { signInAction } from '../_lib/actions';
import SubmitButton from './SubmitButton';

export default function SignupForm() {
	const formRef = useRef();

	async function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const result = await signupUser(formData);

		if (result.success) {
			toast.success(result.message);
			setTimeout(() => {
				router.push('/');
			}, 1000);
		} else {
			toast.error(result.message);
			formRef.current?.reset();
		}
	}

	return (
		<div className="flex flex-col items-center justify-center rounded-2xl border border-black shadow">
			<div className="w-full max-w-sm rounded-lg p-8">
				<h2 className="mb-6 text-center text-2xl font-bold text-textdark">Create an account</h2>

				<form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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

					<SubmitButton
						pendingLabel="Signing up..."
						className="w-full rounded-md bg-orange py-2 font-medium text-white transition hover:opacity-90"
					>
						Sign up
					</SubmitButton>
				</form>

				<form action={signInAction} className="mt-4">
					<button className="border-primary-100 flex w-full items-center justify-center gap-3 rounded-md border py-2 font-medium transition hover:bg-gray-100">
						<img
							src="https://authjs.dev/img/providers/google.svg"
							alt="Google logo"
							height="24"
							width="24"
						/>
						<span>Continue with Google</span>
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
