export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import Spinner from '@/app/_components/Spinner';
import ReviewAdminTable from '@/app/_components/ReviewAdminTable';
import ReviewsSorting from '@/app/_components/ReviewsSorting';

export const metadata = {
	title: 'Reviews',
};

export default function Page({ searchParams }) {
	return (
		<main className="bg-beige pb-10 font-sans text-textdark">
			<div className="flex items-center justify-between pb-5">
				<div className="pl-3 text-3xl">All Reviews</div>
				<ReviewsSorting />
			</div>

			<Suspense fallback={<Spinner />} key={JSON.stringify(searchParams)}>
				<ReviewAdminTable searchParams={searchParams} />
			</Suspense>
		</main>
	);
}
