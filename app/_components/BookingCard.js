import Image from 'next/image';
import clsx from 'clsx';
import { format } from 'date-fns';
import Link from 'next/link';
import { Calendar, Clock, Globe2, Star } from 'lucide-react';
import { getTour } from '../_lib/data-service';

const difficultyColors = {
	easy: 'bg-[#809c7e]',
	medium: 'bg-[#dbbfbf]',
	difficult: 'bg-[#ed8e6d]',
};

export default async function BookingCard({ tourId }) {
	const tour = await getTour(tourId);
	const bgColor = difficultyColors[tour.difficulty] || 'bg-gray-50';

	return (
		<div className="flex flex-col overflow-hidden rounded-xl shadow-md transition-shadow">
			<div className="relative h-40">
				<Image
					src={`/img/tours/${tour.imageCover}`}
					alt={tour.name}
					fill
					className="object-cover"
				/>
			</div>

			<div className={clsx('flex flex-col gap-2 p-4', bgColor)}>
				<h3 className="text-lg font-semibold leading-snug text-textdark">{tour.name}</h3>

				<div className="flex items-center text-sm">
					<Globe2 className="mr-1 h-4 w-4" />
					<span className="mr-4 text-textdark">{tour.startLocation.description}</span>
					<Clock className="mr-1 h-4 w-4" />
					<p className="text-textdark">{tour.duration} Days</p>
				</div>

				<div className="flex items-center text-sm">
					<Calendar className="mr-1 h-4 w-4" />
					<p className="text-sm">{format(new Date(tour.startDates[0]), 'MMMM yyyy')}</p>
				</div>

				<div className="flex items-center text-sm">
					<Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
					<span className="mr-1">{tour.ratingsAverage.toFixed(1)}</span>
					<span className="text-gray-500">({tour.ratingsQuantity.toLocaleString()})</span>
				</div>

				<p className="text-right text-base text-textdark">from ${tour.price}</p>
			</div>
		</div>
	);
}
