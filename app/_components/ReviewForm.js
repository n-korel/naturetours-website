'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import SubmitButton from './SubmitButton';
import StarRating from './StarRating';
import { addReview } from '../_lib/actions';

export default function ReviewForm({ tourId }) {
	const [rating, setRating] = useState(0);
	const [text, setText] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const result = await addReview(formData, tourId);

		if (result.success) {
			toast.success(result.message);
			setText('');
			setRating(0);
		} else {
			toast.error(result.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 rounded-xl border p-6 shadow">
			<h3 className="text-xl font-semibold text-textdark">Leave a Review</h3>

			<div className="flex flex-col gap-2">
				<label className="text-sm font-medium text-textdark">Your Review</label>
				<textarea
					name="review"
					value={text}
					onChange={(e) => setText(e.target.value)}
					rows="4"
					className="rounded-lg border border-gray-300 px-4 py-2 focus:border-orange focus:outline-none"
					required
				></textarea>
			</div>

			<StarRating value={rating} onChange={setRating} />
			<input type="hidden" name="rating" value={rating} />

			<div className="flex justify-end">
				<SubmitButton
					pendingLabel="Submitting..."
					className="w-40 rounded-full bg-orange py-2 font-semibold text-white transition hover:bg-opacity-80 disabled:bg-opacity-70"
				>
					Submit
				</SubmitButton>
			</div>
		</form>
	);
}
