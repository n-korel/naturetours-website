import Image from 'next/image';
import clsx from 'clsx';
import { format } from 'date-fns';

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_API_URL;

const difficultyColors = {
	easy: 'bg-[#809c7e]',
	medium: 'bg-[#dbbfbf]',
	difficult: 'bg-[#ed8e6d]',
};

export default function TourCard({ tour }) {
	const bgColor = difficultyColors[tour.difficulty] || 'bg-gray-50';

	return (
		<div className="rounded-xl overflow-hidden shadow-md flex flex-col ">
			<div className="h-40 relative">
				<Image
					src={`${BASE_IMAGE_URL}img/tours/${tour.imageCover}`}
					alt={tour.name}
					fill
					className="object-cover"
				/>
			</div>

			<div className={clsx('p-4 flex-1 flex flex-col justify-between', bgColor)}>
				<h3 className="font-semibold text-textdark text-lg leading-snug">{tour.name}</h3>
				<p className="text-sm text-textdark">{tour.startLocation.description}</p>
				<p className="text-sm mt-2">{format(new Date(tour.startDates[0]), 'MMMM yyyy')}</p>
				<p className="text-textdark text-base mt-2 text-right">from €{tour.price}</p>
			</div>
		</div>
	);
}
