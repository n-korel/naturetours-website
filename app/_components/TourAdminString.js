'use client';

import { format } from 'date-fns';
import TourDetailButton from './TourDetailButton';

export default function TourAdminString({ tour, isOpen, onToggle }) {
	return (
		<div className="flex border border-t border-gray-200 text-base font-normal text-textdark">
			<div className="flex flex-1 items-center whitespace-nowrap border p-2 font-medium">
				{tour.name ?? 'Tour'}
			</div>
			<div className="flex flex-1 items-center border p-2">
				{format(new Date(tour.startDates[0]), 'MMMM yyyy')}
			</div>
			<div className="flex flex-1 items-center border p-2">{tour.duration} Days</div>
			<div className="flex flex-1 items-center border p-2">{tour.difficulty}</div>
			<div className="flex flex-1 items-center border p-2">{tour.maxGroupSize} people</div>
			<div className="flex flex-1 items-center border p-2">{tour.ratingsAverage} / 5</div>
			<div className="flex flex-1 items-center justify-between border p-2">
				<div>{tour.price} $</div>
				<TourDetailButton isOpen={isOpen} onToggle={onToggle} tour={tour} />
			</div>
		</div>
	);
}
