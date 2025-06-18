import { getAllReviews } from '../_lib/data-service';
import Pagination from './Pagination';
import ReviewAdminList from './ReviewAdminList';

export default async function ReviewAdminTable({ searchParams }) {
	const page = Number(searchParams.page || 1);
	const sort = searchParams.sort || '';
	const limit = 10;

	const { reviews } = await getAllReviews(page, limit, sort);
	if (!reviews) return {};
	const allReviews = await getAllReviews();
	const totalPages = Math.ceil(allReviews.total / limit);

	return (
		<div className="w-full">
			<div className="rounded-xl border border-gray-200">
				<div className="flex rounded-t-lg bg-gray-300 text-lg font-semibold text-textdark">
					<div className="flex-1 border p-2">User</div>
					<div className="flex-1 border p-2">Rating</div>
					<div className="flex-1 border p-2">Date</div>
					<div className="flex-1 border p-2">Tour</div>
					<div className="flex-1 border p-2">Text</div>
				</div>
				<ReviewAdminList reviews={reviews} />
			</div>

			<Pagination totalPages={totalPages} currentPage={page} basePath="/management/reviews" />
		</div>
	);
}
