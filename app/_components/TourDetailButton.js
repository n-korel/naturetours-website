'use client';

import { EllipsisVertical } from 'lucide-react';
import { useRef, useState } from 'react';
import Modal from './Modal';
import useClickOutside from './hooks/useClickOutside';
import UpdateTourForm from './UpdateTourForm';
import DeleteTourForm from './DeleteTourForm';

export default function TourDetailButton({ isOpen, onToggle, tour }) {
	const [showModalUpdate, setShowModalUpdate] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
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
						onClick={() => setShowModalUpdate(true)}
					>
						Update tour
					</li>
					<li
						className="cursor-pointer px-4 py-2 hover:bg-gray-100"
						onClick={() => setShowModalDelete(true)}
					>
						Delete Tour
					</li>
				</ul>
			)}

			{showModalUpdate && (
				<Modal onClose={() => setShowModalUpdate(false)} width={'max-w-3xl'}>
					<UpdateTourForm tour={tour} setShowModalUpdate={setShowModalUpdate} />
				</Modal>
			)}

			{showModalDelete && (
				<Modal onClose={() => setShowModalDelete(false)} width={'max-w-xl'}>
					<DeleteTourForm tour={tour} setShowModalDelete={setShowModalDelete} />
				</Modal>
			)}
		</div>
	);
}
