'use client';

import { EllipsisVertical } from 'lucide-react';
import { useRef, useState } from 'react';
import Modal from './Modal';
import useClickOutside from './hooks/useClickOutside';

export default function TourDetailButton({ isOpen, onToggle }) {
	const [showModal, setShowModal] = useState(false);
	const menuRef = useRef(null);

	useClickOutside(menuRef, () => {
		if (isOpen) onToggle();
	});

	return (
		<div className="relative inline-block" ref={menuRef}>
			<button
				onClick={(e) => {
					e.stopPropagation();
					onToggle();
				}}
				className="flex items-center rounded bg-beige"
			>
				<EllipsisVertical />
			</button>

			{isOpen && (
				<ul className="absolute right-0 z-10 mt-1 w-48 rounded border bg-beige shadow">
					<li
						className="cursor-pointer px-4 py-2 hover:bg-gray-100"
						onClick={() => setShowModal(true)}
					>
						Update tour
					</li>
					<li
						className="cursor-pointer px-4 py-2 hover:bg-gray-100"
						onClick={() => setShowModal(true)}
					>
						Delete Tour
					</li>
				</ul>
			)}

			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<h2 className="text-lg font-semibold text-textdark">
						Are you sure you want to delete your profile?
					</h2>
					<div className="mt-6 flex justify-end gap-3">
						<button
							onClick={() => setShowModal(false)}
							className="rounded-full border border-gray-400 bg-white px-4 py-2 text-sm text-textdark transition hover:opacity-80 disabled:opacity-80 sm:text-lg"
						>
							Cancel
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
}
