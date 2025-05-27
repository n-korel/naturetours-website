'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
	{ label: 'Alphabetical (A-Z)', value: 'name' },
	{ label: 'Date (Newest)', value: '-startDates' },
	{ label: 'Duration (Shortest)', value: 'duration' },
	{ label: 'Duration (Longest)', value: '-duration' },
	{ label: 'Price (Lowest)', value: 'price' },
	{ label: 'Price (Highest)', value: '-price' },
	{ label: 'Rating (Lowest)', value: 'ratingsAverage' },
	{ label: 'Rating (Highest)', value: '-ratingsAverage' },
];

export default function Sorting() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const currentSort = searchParams.get('sort') || '';
	const [open, setOpen] = useState(false);

	function handleSort(value) {
		const params = new URLSearchParams(searchParams);

		if (value) {
			params.set('sort', value);
		} else {
			params.delete('sort');
		}

		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		setOpen(false);
	}

	return (
		<div className="relative mt-4 inline-block">
			<button
				onClick={() => setOpen(!open)}
				className="flex items-center rounded bg-beige px-4 py-2"
			>
				Sort: {sortOptions.find((opt) => opt.value === currentSort)?.label || 'None'}
				<ChevronDown className="ml-2 h-4 w-4" />
			</button>

			{open && (
				<ul className="absolute right-0 z-10 mt-1 w-48 rounded border bg-beige shadow">
					{sortOptions.map((option) => (
						<li
							key={option.value}
							className="cursor-pointer px-4 py-2 hover:bg-gray-100"
							onClick={() => handleSort(option.value)}
						>
							{option.label}
						</li>
					))}
					<li
						className="cursor-pointer px-4 py-2 text-red-500 hover:bg-gray-100"
						onClick={() => handleSort('')}
					>
						Clear sort
					</li>
				</ul>
			)}
		</div>
	);
}
