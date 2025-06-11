import Image from 'next/image';
import reviews from '@/public/reviews.jpg';
import ReviewList from '../_components/ReviewList';
import { Suspense } from 'react';
import Spinner from '../_components/Spinner';

export const metadata = {
	title: 'Reviews',
};

export default function Page({ searchParams }) {
	return (
		<main className="bg-beige">
			<section className="relative mx-auto max-w-7xl px-6 pb-4 pt-16">
				<div className="relative h-[500px] w-full overflow-hidden rounded-xl shadow-xl">
					<Image
						src={reviews}
						alt="Reviews"
						placeholder="blur"
						quality={80}
						fill
						priority
						className="object-cover"
					/>

					<div className="absolute left-0 top-0 flex h-full max-w-[700px] flex-col items-center justify-center bg-forest/90 p-28 text-white">
						<h1 className="mb-6 text-5xl font-bold leading-tight">Reviews</h1>
					</div>
				</div>
			</section>

			<section>
				<div className="mx-auto flex max-w-7xl items-center justify-between px-6">
					<Suspense fallback={<Spinner />} key={JSON.stringify(searchParams)}>
						<ReviewList searchParams={searchParams} />
					</Suspense>
				</div>
			</section>
		</main>
	);
}
