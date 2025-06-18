'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateAdminReview } from '../_lib/actions';
import SubmitButton from './SubmitButton';
import { useRouter } from 'next/navigation';

export default function UpdateReviewAdminForm({ review, setShowModalUpdate }) {
	const [reviewText, setReviewText] = useState(review.review);
	const [rating, setRating] = useState(review.rating);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('review', reviewText);
		formData.append('rating', rating);

		const result = await updateAdminReview(formData, review.id);

		if (result.success) {
			toast.success(result.message);
			setShowModalUpdate(false);
			router.push('/management/reviews');
		} else {
			toast.error(result.message);
		}
	};

	return (
		<div className="p-8">
			<h2 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-left">
				Update {review?.user?.name}
			</h2>

			<form onSubmit={handleSubmit} className="flex flex-col gap-10 md:flex-row md:items-start">
				<div className="flex w-full flex-col gap-6">
					<div className="flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-600">Text Review</label>
						<input
							name="review"
							type="text"
							value={reviewText}
							onChange={(e) => setReviewText(e.target.value)}
							className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-600">Review Rating</label>
						<input
							name="rating"
							type="number"
							max={5}
							min={0}
							value={rating}
							onChange={(e) => setRating(e.target.value)}
							className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
						/>
					</div>

					<div className="flex justify-end gap-5">
						<button
							type="button"
							onClick={() => setShowModalUpdate(false)}
							className="w-36 rounded-3xl border border-gray-400 bg-white px-4 py-2 text-sm font-semibold text-textdark transition hover:opacity-80 disabled:opacity-80 sm:text-lg"
						>
							Cancel
						</button>

						<SubmitButton
							pendingLabel="Saving..."
							className="w-40 rounded-3xl bg-orange py-3 font-semibold text-white transition hover:bg-opacity-80 disabled:bg-opacity-80"
						>
							Save changes
						</SubmitButton>
					</div>
				</div>
			</form>
		</div>
	);
}
