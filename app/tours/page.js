export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import Filters from '../_components/Filters';
import TourList from '../_components/TourList';
import Spinner from '../_components/Spinner';
import Sorting from '../_components/Sorting';

export const metadata = {
	title: 'All tours',
};

export default function Page({ searchParams }) {
	return (
		<main className="bg-beige pb-10 font-sans text-textdark">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6">
				<Filters />
				<Sorting />
			</div>

			<Suspense fallback={<Spinner />} key={JSON.stringify(searchParams)}>
				<TourList searchParams={searchParams} />
			</Suspense>
		</main>
	);
}
