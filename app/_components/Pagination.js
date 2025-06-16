'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages, currentPage, basePath }) {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);

	if (totalPages <= 1) return null;

	return (
		<div className="mt-6 flex flex-wrap gap-2">
			{Array.from({ length: totalPages }, (_, i) => {
				params.set('page', i + 1);

				return (
					<Link
						key={i}
						href={`${basePath}?${params.toString()}`}
						className={`rounded border px-3 py-1 transition ${
							currentPage === i + 1
								? 'bg-orange text-white'
								: 'bg-white text-textdark hover:bg-gray-100'
						}`}
					>
						{i + 1}
					</Link>
				);
			})}
		</div>
	);
}
