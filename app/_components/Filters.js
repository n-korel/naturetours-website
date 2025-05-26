'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const filters = [
	{ label: 'Month', param: 'month', values: ['1', '2', '3'] },
	{ label: 'Year', param: 'year', values: ['2024', '2025'] },
	{ label: 'Difficulty', param: 'difficulty', values: ['easy', 'medium', 'difficult'] },
	{ label: 'Rating', param: 'rating', values: ['<2.5', '2.5-4.5', '4.5-5'] },
	{ label: 'Duration', param: 'duration', values: ['<3', '3-5', '>5'] },
	{ label: 'Price', param: 'price', values: ['<500', '500-1500', '>1500'] },
];

export default function Filters() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	function handleFilter(param, value) {
		const params = new URLSearchParams(searchParams);
		params.set(param, value);
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	return (
		<div className="mb-6 mt-8 flex flex-wrap justify-center gap-4">
			{filters.map((filter) =>
				filter.values.map((value) => (
					<button
						key={`${filter.param}-${value}`}
						className="rounded-full border bg-white px-6 py-2 text-sm font-medium shadow-sm hover:bg-gray-100"
						onClick={() => handleFilter(filter.param, value)}
					>
						{filter.label}: {value}
					</button>
				)),
			)}
		</div>
	);
}
