import TourCard from './TourCard';
import { getTours } from '../_lib/data-service';

export default async function TourList() {
	console.log('Starting...');
	const tours = await getTours();
	console.log(tours);

	return (
		<div className="max-w-7xl mx-auto px-6">
			<h2 className="text-xl font-semibold mb-4">{tours.results} tours available</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{tours.data.data.map((tour) => (
					<TourCard key={tour.id} tour={tour} />
				))}
			</div>
			<div className="text-center mt-6">
				<button className="text-orange font-semibold underline">Load more</button>
			</div>
		</div>
	);
}
