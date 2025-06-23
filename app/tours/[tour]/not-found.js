export const dynamic = 'force-dynamic';
import Link from 'next/link';

function NotFound() {
	return (
		<main className="mt-4 space-y-6 pt-[80px] text-center">
			<h1 className="text-3xl font-semibold">This tour could not be found</h1>
			<Link
				href="/tours"
				className="inline-block rounded-full bg-orange px-6 py-3 text-lg text-white"
			>
				Go back to all tours
			</Link>
		</main>
	);
}

export default NotFound;
