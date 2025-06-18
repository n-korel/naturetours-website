'use client';

import { bookTour } from '../_lib/stripe';

export default function BookingButton({ tourId }) {
	const handleBooking = () => {
		bookTour(tourId);
	};

	return (
		<button
			onClick={handleBooking}
			className="inline-block flex w-44 justify-center rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
		>
			Book Tour Now!
		</button>
	);
}
