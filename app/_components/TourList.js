import TourCard from './TourCard';
import { getTours } from '../_lib/data-service';

export default async function TourList({ searchParams }) {
	const tours = await getTours(searchParams);

	if (!tours.length) {
		return null;
	}

	return (
		<div className="mx-auto max-w-7xl px-6">
			<h2 className="mb-4 text-xl font-semibold">{tours.length} tours available</h2>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{tours.map((tour) => (
					<TourCard key={tour.id} tour={tour} />
				))}
			</div>
			{/* 			<div className="mt-6 text-center">
				<button className="font-semibold text-orange underline">Load more</button>
			</div> */}
		</div>
	);
}
