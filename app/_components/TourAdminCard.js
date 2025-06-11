import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import DeleteReservation from '@/app/_components/DeleteReservation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Globe2 } from 'lucide-react';

export default function TourAdminCard({ tour, onDelete }) {
	return (
		<div className="border-primary-800 flex border">
			<div className="relative aspect-square h-32">
				<Image
					src={`/img/tours/${tour.imageCover}`}
					alt={tour.name}
					fill
					className="border-primary-800 border-r object-cover"
				/>
			</div>

			<div className="flex flex-grow flex-col px-6 py-3">
				<div className="flex items-center justify-between">
					<h3 className="text-xl font-semibold">{tour.name}</h3>
					<div className="flex items-center text-sm">
						<Globe2 className="mr-1 h-4 w-4" />
						<span className="mr-4 text-textdark">{tour.startLocation.description}</span>
						<Clock className="mr-1 h-4 w-4" />
						<p className="text-textdark">{tour.duration} Days</p>
					</div>
				</div>

				<div className="mt-auto flex items-baseline gap-5">
					<p className="text-accent-400 text-xl font-semibold">${tour.price}</p>
				</div>
			</div>
		</div>
	);
}
