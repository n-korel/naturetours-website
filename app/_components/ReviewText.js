'use client';
import { useState } from 'react';

export default function ReviewText({ text }) {
	const [isExpanded, setIsExpanded] = useState(false);

	if (!text) {
		return <p className="text-sm text-gray-600">No review text</p>;
	}

	const toggleExpanded = () => {
		setIsExpanded((prev) => !prev);
	};

	const isLong = text.length > 70;
	const displayText = isExpanded || !isLong ? text : `${text.slice(0, 70)}...`;

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
