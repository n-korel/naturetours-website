'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

export default function StarRating({ value = 0, onChange }) {
	const [hoverValue, setHoverValue] = useState(null);

	const handleClick = (index, e) => {
		const { left, width } = e.currentTarget.getBoundingClientRect();
		const clickX = e.clientX - left;
		const newValue = clickX < width / 2 ? index - 0.5 : index;
		onChange?.(newValue);
	};

	const handleMouseMove = (index, e) => {
		const { left, width } = e.currentTarget.getBoundingClientRect();
		const hoverX = e.clientX - left;
		const newHover = hoverX < width / 2 ? index - 0.5 : index;
		setHoverValue(newHover);
	};

	const handleMouseLeave = () => setHoverValue(null);

	const displayValue = hoverValue ?? value;
	const stars = [1, 2, 3, 4, 5];

	return (
		<div className="flex items-center gap-3">
			<div className="flex gap-1" onMouseLeave={handleMouseLeave}>
				{stars.map((star) => {
					const isFull = displayValue >= star;
					const isHalf = displayValue >= star - 0.5 && displayValue < star;

					return (
						<div
							key={star}
							className="relative h-6 w-6 cursor-pointer"
							onClick={(e) => handleClick(star, e)}
							onMouseMove={(e) => handleMouseMove(star, e)}
						>
							<Star className="h-6 w-6 text-gray-300" />
							<div
								className="absolute left-0 top-0 h-full overflow-hidden"
								style={{
									width: isFull ? '100%' : isHalf ? '50%' : '0%',
									pointerEvents: 'none',
								}}
							>
								<Star className="h-6 w-6 fill-yellow-200 text-yellow-200" stroke="none" />
							</div>
						</div>
					);
				})}
			</div>
			<span className="text-sm text-textdark">{displayValue} / 5</span>
		</div>
	);
}
