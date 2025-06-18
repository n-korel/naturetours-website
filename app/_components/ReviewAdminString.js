import { format } from 'date-fns';
import ReviewText from './ReviewText';
import ReviewAdminButton from './ReviewAdminButton';
import { getTour } from '../_lib/data-service';

export default async function ReviewAdminString({ review }) {
	const tour = (await getTour(review.tour)) ?? '';
	return (
		<div className="flex border border-t border-gray-200 font-normal text-textdark">
			<div className="flex flex-1 items-center gap-5 whitespace-nowrap border p-2 text-base font-medium">
				<img
					src={`/img/users/${review?.user?.photo ?? 'default.jpg'}`}
					alt={review?.user?.name ?? 'User'}
					className="h-14 w-14 rounded-full"
					referrerPolicy="no-referrer"
				/>
				{review?.user?.name ?? 'User'}
			</div>
			<div className="flex flex-1 items-center border p-2 text-base">
				{review?.rating ?? ''} / 5
			</div>
			<div className="flex flex-1 items-center border p-2 text-base">
				{review?.createdAt ? format(new Date(review.createdAt), 'dd.MM.yyyy') : '-'}
			</div>
			<div className="flex flex-1 items-center border p-2 text-base">{tour?.name ?? '-'}</div>
			<div className="flex flex-1 items-center justify-between border p-2">
				<ReviewText text={review?.review} />
				<ReviewAdminButton review={review} />
			</div>
		</div>
	);
}
