'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import useClickOutside from './hooks/useClickOutside';

const sortOptions = [
	{ label: 'Date(Newest)', value: '-createdAt' },
	{ label: 'Date(Oldest)', value: 'createdAt' },
	{ label: 'Rating(Best)', value: '-rating' },
	{ label: 'Rating(Worst)', value: 'rating' },
];

export default function ReviewsSorting() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const currentSort = searchParams.get('sort') || '';
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	useClickOutside(dropdownRef, () => setOpen(false));

	function handleSort(value) {
		const params = new URLSearchParams(searchParams);
		if (value) {
			params.set('sort', value);
		} else {
			params.delete('sort');
		}
		params.delete('page');
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		setOpen(false);
	}

	return (
		<div className="relative mt-4 inline-block" ref={dropdownRef}>
			<button
				onClick={(e) => {
					e.stopPropagation();
					setOpen((prev) => !prev);
				}}
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
