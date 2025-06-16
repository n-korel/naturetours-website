import { Suspense } from 'react';
import Spinner from '../_components/Spinner';
import Sorting from '../_components/Sorting';
import TourAdminTable from '../_components/TourAdminTable';

export const metadata = {
	title: 'Tours',
};

export default function Page({ searchParams }) {
	return (
		<main className="bg-beige pb-10 font-sans text-textdark">
			<div className="flex items-center justify-between pb-5">
				<div className="pl-3 text-3xl">All Tours</div>
				<Sorting />
			</div>

			<Suspense fallback={<Spinner />} key={JSON.stringify(searchParams)}>
				<TourAdminTable searchParams={searchParams} />
			</Suspense>
		</main>
	);
}
