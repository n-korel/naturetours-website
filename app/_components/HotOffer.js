import Image from 'next/image';
import Link from 'next/link';
import { getTour, getTourId } from '../_lib/data-service';
import { Calendar, Clock, DollarSign, DollarSignIcon, Star, TrendingUp, User } from 'lucide-react';
import { format } from 'date-fns';

export default async function HotOffer() {
	const slug = 'the-sports-lover';
	const tourId = await getTourId(slug);

	if (!tourId) {
		notFound();
	}

	const tour = await getTour(tourId.id);
	return (
		<section className="relative mx-auto my-24 max-w-7xl rounded-xl bg-lightgray p-6 shadow">
			<div className="absolute right-4 top-4 flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full bg-orange text-sm font-bold text-white">
				<p>HOT</p>
				<p>OFFER</p>
			</div>

			<div className="flex items-center justify-between gap-6">
				<div className="ml-28 flex flex-col gap-14">
					<h2 className="mb-4 text-5xl font-bold text-textdark">{tour.name}</h2>
					<div className="grid grid-cols-2 gap-4 text-xl">
						<div className="flex items-center gap-3">
							<Calendar className="h-8 w-8 text-orange" />
							<span>{format(new Date(tour.startDates[0]), 'MMMM yyyy')}</span>
						</div>
						<div className="flex items-center gap-3">
							<Clock className="h-8 w-8 text-orange" />
							<span>{`${tour.duration} days`}</span>
						</div>
						<div className="flex items-center gap-3">
							<Star className="h-8 w-8 text-orange" />
							<span>{tour.ratingsAverage} / 5</span>
						</div>
						<div className="flex items-center gap-3 pr-1">
							<DollarSignIcon className="h-8 w-8 text-orange" />
							<span>{tour.price} $</span>
						</div>
					</div>

					<Link
						href={`/tours/${tour.slug}`}
						className="inline-flex max-w-40 items-center justify-center rounded-full bg-orange px-6 py-2 text-lg font-medium text-white transition hover:bg-orange/90"
					>
						Изучать
					</Link>
				</div>

				<div className="flex gap-4 p-6">
					<div className="flex flex-col items-center justify-center gap-4">
						<Image
							src={`/img/tours/${tour.images[0]}`}
							width={200}
							height={150}
							alt="azores"
							className="h-auto w-full rounded-lg object-cover"
						/>
						<Image
							src={`/img/tours/${tour.images[1]}`}
							width={200}
							height={150}
							alt="azores"
							className="h-auto w-full rounded-lg object-cover"
						/>
					</div>
					<Image
						src={`/img/tours/${tour.images[2]}`}
						width={250}
						height={500}
						alt="azores"
						className="rounded-lg object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
