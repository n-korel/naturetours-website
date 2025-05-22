'use client';

import { useState } from 'react';
import ReviewCard from './ReviewCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ReviewsCarousel({ reviews }) {
	const [index, setIndex] = useState(0);
	const visibleCards = 5;

	const handlePrev = () => {
		setIndex((prev) => Math.max(prev - 1, 0));
	};

	const handleNext = () => {
		setIndex((prev) => Math.min(prev + 1, reviews.length - visibleCards));
	};

	return (
		<div className="relative">
			<div className="flex items-center gap-4 overflow-hidden">
				{index > 0 && (
					<button
						onClick={handlePrev}
						className="absolute left-0 z-10 rounded-full bg-white p-2 shadow hover:bg-gray-100"
					>
						<ChevronLeft className="text-gray-600" />
					</button>
				)}
				<div
					className="ml-10 flex gap-4 transition-transform duration-300 ease-in-out"
					style={{ transform: `translateX(-${index * 320}px)` }}
				>
					{reviews.map((review) => (
						<ReviewCard key={review.id} review={review} />
					))}
				</div>
				{index < reviews.length - visibleCards && (
					<button
						onClick={handleNext}
						className="absolute right-0 z-10 rounded-full bg-white p-2 shadow hover:bg-gray-100"
					>
						<ChevronRight className="text-gray-600" />
					</button>
				)}
			</div>
		</div>
	);
}

export default ReviewsCarousel;
