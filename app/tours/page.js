import { Suspense } from 'react';
import Filters from '../_components/Filters';
import TourList from '../_components/TourList';
import Spinner from '../_components/Spinner';

export const metadata = {
	title: 'All tours',
};

export default function Page({ searchParams }) {
	return (
		<main className="bg-beige pb-10 font-sans text-textdark">
			<Filters />

			<Suspense fallback={<Spinner />}>
				<TourList searchParams={searchParams} />
			</Suspense>
		</main>
	);
}
