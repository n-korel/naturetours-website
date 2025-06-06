import { getTour, getTourId, getTours, getToursSSG } from '@/app/_lib/data-service';

import ImageGallery from '@/app/_components/ImageGallery';
import MainImage from '@/app/_components/MainImage';
import FactsTour from '@/app/_components/FactsTour';
import dynamic from 'next/dynamic';
import ReviewsCarousel from '@/app/_components/ReviewsCarousel';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const Map = dynamic(() => import('@/app/_components/Map'), {
	ssr: false, // Leaflet требует отключить SSR
});

export const revalidate = 3600;

export async function generateMetadata({ params }) {
	const tourId = await getTourId(params.tour);

	if (!tourId) {
		notFound();
	}

	const tour = await getTour(tourId.id);

	return { title: tour.name };
}

export async function generateStaticParams() {
	const tours = await getToursSSG();

	const slugs = tours.map((tour) => ({
		tour: String(tour.slug),
	}));

	return slugs;
}

export default async function Page({ params }) {
	const tourId = await getTourId(params.tour);

	if (!tourId) {
		notFound();
	}

	const tour = await getTour(tourId.id);

	return (
		<main className="bg-beige font-sans text-textdark">
			<section className="relative h-[500px] w-full">
				<MainImage tour={tour} />
			</section>

			<section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2">
				<ImageGallery tour={tour} />

				<div className="flex flex-col rounded-2xl bg-[#e5dbc4] p-8 shadow">
					<FactsTour tour={tour} />

					<div className="flex justify-center">
						<Link
							href={`/tours/${tour.slug}/booking`}
							className="flex w-72 items-center justify-center rounded-3xl bg-forest px-6 py-3 uppercase text-white transition hover:bg-opacity-90"
						>
							Book tour now!
						</Link>
					</div>
				</div>
			</section>
			<section className="mx-auto max-w-7xl px-6">
				<h2 className="mb-4 text-2xl font-bold uppercase text-orange">{`About ${tour.name}`}</h2>
				<p className="text-base leading-relaxed">{tour.description}</p>
			</section>
			<section className="mx-auto max-w-7xl p-6">
				<h1 className="mb-4 text-2xl font-bold uppercase text-orange">Tour Locations</h1>
				<Map locations={tour.locations} />
			</section>
			<section className="mx-auto max-w-7xl p-6">
				<h1 className="mb-4 text-2xl font-bold uppercase text-orange">Reviews</h1>
				<ReviewsCarousel reviews={tour.reviews} />
			</section>
		</main>
	);
}
