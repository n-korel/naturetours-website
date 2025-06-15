import { Suspense } from 'react';
import Spinner from '../_components/Spinner';
import TourAdminList from '../_components/TourAdminList';
import Sorting from '../_components/Sorting';

export const metadata = {
	title: 'Tours',
};

export default function Page({ searchParams }) {
	return (
		<main className="bg-beige pb-10 font-sans text-textdark">
			<div>Tours</div>
			<div className="mx-auto flex max-w-7xl items-center justify-end px-6">
				<Sorting />
			</div>

			<Suspense fallback={<Spinner />} key={JSON.stringify(searchParams)}>
				<TourAdminList searchParams={searchParams} />
			</Suspense>
		</main>
	);
}
