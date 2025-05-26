import { getTour, getTourId, getTours } from '@/app/_lib/data-service';

import ImageGallery from '@/app/_components/ImageGallery';
import MainImage from '@/app/_components/MainImage';
import FactsTour from '@/app/_components/FactsTour';
import dynamic from 'next/dynamic';
import ReviewsCarousel from '@/app/_components/ReviewsCarousel';
import { notFound } from 'next/navigation';

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
	const tours = await getTours();

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
				<FactsTour tour={tour} />
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
