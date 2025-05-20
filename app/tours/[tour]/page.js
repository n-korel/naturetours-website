import { getTour, getTourId } from '@/app/_lib/data-service';

import ImageGallery from '@/app/_components/ImageGallery';
import MainImage from '@/app/_components/MainImage';

export const metadata = {
	title: 'Tour',
};

export default async function Page({ params }) {
	const tourId = await getTourId(params.tour);
	const data = await getTour(tourId.data.data[0].id);

	const tour = data.data.data;
	// console.log(tour);

	return (
		<main className="bg-beige text-textdark font-sans">
			<section className="relative h-[500px] w-full">
				<MainImage tour={tour} />
			</section>

			<section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
				<ImageGallery tour={tour} />

				<p className="text-base leading-relaxed">{tour.description}</p>
			</section>
		</main>
	);
}
