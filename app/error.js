'use client';

export default function Error({ error, reset }) {
	return (
		<main className="flex flex-col items-center justify-center gap-6 pt-[80px]">
			<h1 className="text-3xl font-semibold">Something went wrong!</h1>
			<p className="text-lg">{error.message}</p>

			<button
				className="inline-block rounded-full bg-orange px-6 py-3 text-lg text-white"
				onClick={reset}
			>
				Try again
			</button>
		</main>
	);
}
