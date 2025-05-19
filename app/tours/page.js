import { Suspense } from 'react';
import Filters from '../_components/Filters';
import TourList from '../_components/TourList';
import Spinner from '../_components/Spinner';

export const metadata = {
	title: 'All tours',
};

export default function Page() {
	return (
		<main className="bg-beige text-textdark font-sans pb-10">
			<Filters />

			<Suspense fallback={<Spinner />}>
				<TourList />
			</Suspense>
		</main>
	);
}
