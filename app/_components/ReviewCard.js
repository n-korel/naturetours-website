'use client';

import { formatDistanceToNow } from 'date-fns';
import { Star } from 'lucide-react';
import Image from 'next/image';
import ReviewText from './ReviewText';

function ReviewCard({ review }) {
	return (
		<div className="w-[300px] flex-shrink-0 rounded-xl bg-lightgray p-4 shadow-md">
			<div className="mb-2 flex items-center gap-3">
				<Image
					src={`/img/users/${review?.user?.photo}` ?? 'default.jpg'}
					alt={review?.user?.name ?? review.id}
					width={40}
					height={40}
					className="rounded-full"
				/>
				<div>
					<p className="font-semibold">{review?.user?.name ?? 'User'}</p>
					<p className="text-sm text-gray-400">
						{formatDistanceToNow(new Date(review.createdAt))} ago
					</p>
				</div>
			</div>
			<div className="mb-2 flex gap-1">
				{Array.from({ length: 5 }, (_, i) => (
					<Star
						key={i}
						size={20}
						className={i < review.rating ? 'text-yellow-300' : 'text-gray-300'}
						fill={i < review.rating ? '#fde047' : 'none'}
					/>
				))}
			</div>
			<ReviewText text={review.review} />
		</div>
	);
}

export default ReviewCard;
