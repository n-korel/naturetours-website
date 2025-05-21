import TourCard from './TourCard';
import { getTours } from '../_lib/data-service';

export default async function TourList() {
	const tours = await getTours();

	if (!tours.results) {
		return null;
	}

	return (
		<div className="mx-auto max-w-7xl px-6">
			<h2 className="mb-4 text-xl font-semibold">{tours.results} tours available</h2>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{tours.data.data.map((tour) => (
					<TourCard key={tour.id} tour={tour} />
				))}
			</div>
			<div className="mt-6 text-center">
				<button className="font-semibold text-orange underline">Load more</button>
			</div>
		</div>
	);
}
