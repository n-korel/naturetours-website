import { format } from 'date-fns';
import { getTour } from '../_lib/data-service';
import ReviewText from './ReviewText';
import ReviewAdminButton from './ReviewAdminButton';

export default async function ReviewString({ review }) {
	const tour = (await getTour(review.tour)) ?? '';
	return (
		<div className="grid grid-cols-5 items-center border border-t border-gray-200 px-4 py-3 text-sm text-gray-800 transition">
			<div className="flex items-center justify-start gap-3">
				<img
					src={`/img/users/${review?.user?.photo ?? 'default.jpg'}`}
					alt={review?.user?.name ?? 'User'}
					className="h-10 w-10 rounded-full"
					referrerPolicy="no-referrer"
				/>
				<div className="font-medium">{review?.user?.name ?? 'User'}</div>
			</div>
			<div className="pl-2">{review.rating} / 5</div>
			<div>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</div>
			<div>{tour.name}</div>
			<div className="flex gap-2">
				<ReviewText text={review.review} />
			</div>
		</div>
	);
}
