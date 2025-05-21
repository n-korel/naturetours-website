import Image from 'next/image';
import clsx from 'clsx';
import { format } from 'date-fns';
import Link from 'next/link';

// const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_API_URL;

const difficultyColors = {
	easy: 'bg-[#809c7e]',
	medium: 'bg-[#dbbfbf]',
	difficult: 'bg-[#ed8e6d]',
};

export default function TourCard({ tour }) {
	const bgColor = difficultyColors[tour.difficulty] || 'bg-gray-50';

	return (
		<Link href={`/tours/${tour.slug}`} className="block">
			<div className="flex cursor-pointer flex-col overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:brightness-95">
				<div className="relative h-40">
					<Image
						src={`/img/tours/${tour.imageCover}`}
						alt={tour.name}
						fill
						className="object-cover"
					/>
				</div>

				<div className={clsx('flex flex-1 flex-col justify-between p-4', bgColor)}>
					<h3 className="text-lg font-semibold leading-snug text-textdark">{tour.name}</h3>
					<p className="text-sm text-textdark">{tour.startLocation.description}</p>
					<p className="mt-2 text-sm">{format(new Date(tour.startDates[0]), 'MMMM yyyy')}</p>
					<p className="mt-2 text-right text-base text-textdark">from €{tour.price}</p>
				</div>
			</div>
		</Link>
	);
}
