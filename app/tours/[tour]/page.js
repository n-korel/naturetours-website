import { getTour, getTourId } from '@/app/_lib/data-service';

import ImageGallery from '@/app/_components/ImageGallery';
import MainImage from '@/app/_components/MainImage';
import FactsTour from '@/app/_components/FactsTour';
import dynamic from 'next/dynamic';
export const metadata = {
	title: 'Tour',
};

const Map = dynamic(() => import('@/app/_components/Map'), {
	ssr: false, // Leaflet требует отключить SSR
});

export default async function Page({ params }) {
	const tourId = await getTourId(params.tour);
	const data = await getTour(tourId.data.data[0].id);

	const tour = data.data.data;
	// console.log(tour);

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
				<h2 className="mb-4 text-lg font-semibold uppercase tracking-wide text-orange">
					{`About ${tour.name}`}
				</h2>
				<p className="text-base leading-relaxed">{tour.description}</p>
			</section>
			<section className="mx-auto max-w-7xl p-6">
				<h1 className="mb-4 text-3xl font-bold">Tour Locations</h1>
				<Map locations={tour.locations} />
			</section>
		</main>
	);
}
