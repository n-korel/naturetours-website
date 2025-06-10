'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import SubmitButton from './SubmitButton';

export default function ReviewForm({ tourId }) {
	const [rating, setRating] = useState(5);
	const [text, setText] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (result.success) {
			toast.success(result.message);
			setText('');
			setRating(5);
		} else {
			toast.error(result.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 rounded-xl border p-6 shadow">
			<h3 className="text-xl font-semibold text-gray-700">Leave a Review</h3>

			<div className="flex flex-col gap-2">
				<label className="text-sm font-medium text-gray-600">Rating (1-5)</label>
				<input
					type="number"
					name="rating"
					value={rating}
					min="1"
					max="5"
					onChange={(e) => setRating(e.target.value)}
					className="rounded-lg border border-gray-300 px-4 py-2 focus:border-orange focus:outline-none"
					required
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-sm font-medium text-gray-600">Your Review</label>
				<textarea
					name="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					rows="4"
					className="rounded-lg border border-gray-300 px-4 py-2 focus:border-orange focus:outline-none"
					required
				></textarea>
			</div>

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
