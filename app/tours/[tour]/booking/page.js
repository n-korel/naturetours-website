import BookingButton from '@/app/_components/BookingButton';
import { getTour, getTourId } from '@/app/_lib/data-service';
import { format } from 'date-fns';
import { Calendar, Clock, Globe2 } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const metadata = {
	title: 'Booking',
};

export default async function Page({ params }) {
	const tourId = await getTourId(params.tour);
	if (!tourId) {
		notFound();
	}

	const tour = await getTour(tourId.id);

	return (
		<main className="bg-beige">
			<section className="relative mx-auto max-w-7xl px-6 pb-4 pt-16">
				<div className="flex justify-center gap-10">
					<div className="flex flex-col justify-center">
						<h2 className="mb-4 text-2xl font-bold">{tour.name} Tour</h2>
						<p className="mb-4 text-lg leading-relaxed">
							Thank you for booking a tour with us. <br />
							We have received your booking and our agents are working out the details.
						</p>
						<p className="mb-6 text-lg leading-relaxed">
							Our guides will contact you soon and will finish the order with you.
						</p>
						<div className="flex justify-center pt-10">
							<BookingButton tourId={tourId.id} />
						</div>
					</div>
					<div className="mx-auto flex max-w-2xl flex-col rounded-2xl bg-forest p-5 text-white">
						<div className="overflow-hidden rounded-lg p-5">
							<Image
								src={`/img/tours/${tour.imageCover}`}
								alt="Tour image"
								width={800}
								height={600}
								className="h-auto w-full rounded-2xl object-cover"
							/>
						</div>
						<div className="flex items-center justify-center text-4xl text-white">{tour.name}</div>
						<div className="flex items-center justify-center gap-10 p-5 text-base text-white">
							<div className="flex items-center">
								<Globe2 className="mr-1 h-4 w-4" />
								<span>{tour.startLocation.description}</span>
							</div>
							<div className="flex items-center">
								<Clock className="mr-1 h-4 w-4" />
								<span>{tour.duration} Days</span>
							</div>
							<div className="flex items-center">
								<Calendar className="mr-1 h-4 w-4" />
								<span>{format(new Date(tour.startDates[0]), 'MMMM yyyy')}</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
