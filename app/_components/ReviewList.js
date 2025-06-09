import Link from 'next/link';
import { getAllReviews } from '../_lib/data-service';
import ReviewString from './ReviewString';

export default async function ReviewList({ searchParams }) {
	const page = Number(searchParams.page || 1);
	// console.log(searchParams);
	// const page = 1;
	const limit = 10;

	const reviews = await getAllReviews(page, limit);
	const total = await getAllReviews(0, 0);
	const totalPages = Math.ceil(total.length / limit);

	return (
		<div className="w-full">
			<div className="overflow-hidden rounded-xl border border-gray-200">
				<div className="bg-beige-100 grid grid-cols-5 rounded-t-lg bg-gray-300 p-6 px-6 py-3 text-sm font-semibold text-textdark">
					<div>User</div>
					<div>Rating</div>
					<div>Date</div>
					<div>Tour</div>
					<div>Text</div>
				</div>

				{reviews.map((review) => (
					<ReviewString key={review.id} review={review} />
				))}
			</div>

			<div className="mt-6 flex gap-2">
				{Array.from({ length: totalPages }, (_, i) => (
					<Link
						key={i}
						href={`/reviews?page=${i + 1}`}
						className={`rounded border px-3 py-1 transition hover:bg-orange ${
							page === i + 1 ? 'bg-orange text-white' : 'bg-white'
						}`}
					>
						{i + 1}
					</Link>
				))}
			</div>
		</div>
	);
}
