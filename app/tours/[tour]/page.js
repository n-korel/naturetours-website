export const dynamic = 'force-dynamic';

import dynamicImport from 'next/dynamic';

import { getCurrentUser, getTour, getTourId, getToursSSG } from '@/app/_lib/data-service';
import ImageGallery from '@/app/_components/ImageGallery';
import MainImage from '@/app/_components/MainImage';
import FactsTour from '@/app/_components/FactsTour';
import ReviewsCarousel from '@/app/_components/ReviewsCarousel';
import { notFound } from 'next/navigation';
import ReviewForm from '@/app/_components/ReviewForm';
import BookingButton from '@/app/_components/BookingButton';

const Map = dynamicImport(() => import('@/app/_components/Map'), {
	ssr: false, // ❗ Leaflet требует отключить SSR
});

export const revalidate = 3600;

export async function generateMetadata({ params }) {
	const tourId = await getTourId(params.tour);
	if (!tourId) return { title: 'Not found' };

	const tour = await getTour(tourId.id);
	if (!tour) return { title: 'Not found' };

	return { title: tour.name };
}

export async function generateStaticParams() {
	const tours = await getToursSSG();
	return tours.map((tour) => ({
		tour: String(tour.slug),
	}));
}

export default async function Page({ params }) {
	const tourId = await getTourId(params.tour);
	if (!tourId) notFound();

	const [tour, user] = await Promise.all([getTour(tourId.id), getCurrentUser()]);

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
						{user?.role === 'user' && <BookingButton tourId={tourId.id} />}
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
				{tour.reviews?.length ? (
					<ReviewsCarousel reviews={tour.reviews} />
				) : (
					<span className="text-base leading-relaxed">No Reviews!</span>
				)}
			</section>

			{user?.role === 'user' && (
				<section className="mx-auto max-w-7xl p-6">
					<h1 className="mb-4 text-2xl font-bold uppercase text-orange">Add Your Review</h1>
					<ReviewForm tourId={tourId.id} />
				</section>
			)}
		</main>
	);
}
