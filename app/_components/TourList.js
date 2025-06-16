import TourCard from './TourCard';
import { getTours } from '../_lib/data-service';
import Pagination from './Pagination';

export default async function TourList({ searchParams }) {
	const page = Number(searchParams.page) || 1;
	const limit = 12;

	const data = await getTours({ ...searchParams, page, limit });
	if (!data) return null;
	const { tours, total } = data;
	const allTours = await getTours({ searchParams });
	const totalPages = Math.ceil(allTours.total / limit);
	return (
		<div className="mx-auto max-w-7xl px-6">
			<h2 className="mb-4 text-xl font-semibold">{total} tours available</h2>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{tours.map((tour) => (
					<TourCard key={tour.id} tour={tour} />
				))}
			</div>

			<Pagination totalPages={totalPages} currentPage={page} basePath="/tours" />
		</div>
	);
}
