import { Suspense } from 'react';
import Filters from '../_components/Filters';
import Spinner from '../_components/Spinner';
import Sorting from '../_components/Sorting';
import TourAdminList from '../_components/TourAdminList';

export const metadata = {
	title: 'Tours',
};

export default function Page({ searchParams }) {
	return (
		<main className="bg-beige pb-10 font-sans text-textdark">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6">
				<Filters />
				<Sorting />
			</div>

			<Suspense fallback={<Spinner />} key={JSON.stringify(searchParams)}>
				<TourAdminList searchParams={searchParams} />
			</Suspense>
		</main>
	);
}
