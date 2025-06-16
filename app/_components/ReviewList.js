import { getAllReviews } from '../_lib/data-service';
import ReviewString from './ReviewString';
import Pagination from './Pagination';

export default async function ReviewList({ searchParams }) {
	const page = Number(searchParams.page || 1);
	const limit = 10;

	const { reviews } = await getAllReviews(page, limit);
	const allReviews = await getAllReviews(0, 0);
	const totalPages = Math.ceil(allReviews.total / limit);

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

				{reviews?.map((review) => (
					<ReviewString key={review.id} review={review} />
				))}
			</div>

			<Pagination totalPages={totalPages} currentPage={page} basePath="/reviews" />
		</div>
	);
}
