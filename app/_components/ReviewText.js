'use client';
import { useState } from 'react';

export default function ReviewText({ text }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpanded = () => {
		setIsExpanded((prev) => !prev);
	};

	const isLong = text.length > 100;
	const displayText = isExpanded || !isLong ? text : `${text.slice(0, 100)}...`;

	return (
		<div>
			<p className="text-sm text-gray-600">{displayText}</p>
			{isLong && (
				<button onClick={toggleExpanded} className="mt-2 text-sm text-blue-500">
					{isExpanded ? 'Show less' : 'Read more'}
				</button>
			)}
		</div>
	);
}
