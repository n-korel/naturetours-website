'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const filters = [
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
		params.delete('page');
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	function handleReset() {
		router.replace(pathname, { scroll: false });
	}

	return (
		<div className="mb-6 mt-8 flex flex-wrap justify-normal gap-4">
			{filters.map((filter) => {
				const current = searchParams.get(filter.param) || '';

				return (
					<div key={filter.param} className="relative">
						<select
							className="rounded-full border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-100"
							value={current}
							onChange={(e) => handleFilter(filter.param, e.target.value)}
						>
							<option value="">{filter.label}</option>
							{filter.values.map((value) => (
								<option key={value} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
				);
			})}

			{searchParams.size !== 0 && (
				<button
					className="font-mediumshadow-sm rounded-full border bg-red-100 px-6 py-2 text-sm hover:bg-red-200"
					onClick={handleReset}
				>
					Reset Filters
				</button>
			)}
		</div>
	);
}
