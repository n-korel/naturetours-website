import BookingCard from '../_components/BookingCard';
import TourCard from '../_components/TourCard';
import { getBookings } from '../_lib/data-service';

export const metadata = {
	title: 'Booking',
};

export default async function Page() {
	const tours = await getBookings();
	return (
		<div className="mx-auto max-w-7xl px-6 pt-[40px]">
			<h2 className="mb-4 text-xl font-semibold">Мои Туры</h2>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{tours.map((tour) => (
					<BookingCard key={tour.id} tourId={tour.id} />
				))}
			</div>
		</div>
	);
}
