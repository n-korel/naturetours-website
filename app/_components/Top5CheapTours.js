import { getTop5CheapTours } from '../_lib/data-service';
import SimpleCardTour from './SimpleCardTour';

export default async function Top5CheapTours() {
	const tours = await getTop5CheapTours();
	if (!tours) return {};
	return (
		<section className="mx-auto my-12 max-w-5xl px-6">
			<h2 className="mb-10 grid-flow-row text-center text-4xl">Top 5 Cheap Tours</h2>

			<div className="grid grid-cols-3 gap-6">
				{tours.map((tour, i) => (
					<SimpleCardTour key={tour.id} tourId={tour.id} />
				))}
			</div>
		</section>
	);
}
