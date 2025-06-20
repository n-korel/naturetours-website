import { getTours } from '../_lib/data-service';
import Pagination from './Pagination';
import TourAdminList from './TourAdminList';

export default async function TourAdminTable({ searchParams }) {
	const page = Number(searchParams.page || 1);
	const limit = 20;

	const { tours } = await getTours({ ...searchParams, page, limit });
	if (!tours) return {};
	const allTours = await getTours({ searchParams });
	const totalPages = Math.ceil(allTours.total / limit);

	return (
		<div className="w-full">
			<div className="rounded-xl border border-gray-200">
				<div className="flex rounded-t-lg bg-gray-300 text-lg font-semibold text-textdark">
					<div className="min-w-0 flex-1 break-words border p-2">Tour</div>
					<div className="flex-1 border p-2">Date</div>
					<div className="flex-1 border p-2">Duration</div>
					<div className="flex-1 border p-2">Difficulty</div>
					<div className="flex-1 border p-2">Participants</div>
					<div className="flex-1 border p-2">Rating</div>
					<div className="flex-1 border p-2">Price</div>
				</div>
				<TourAdminList tours={tours} />
			</div>

			<Pagination totalPages={totalPages} currentPage={page} basePath="/management" />
		</div>
	);
}
