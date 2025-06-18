'use client';

import { EllipsisVertical } from 'lucide-react';
import { useRef, useState } from 'react';
import Modal from './Modal';
import useClickOutside from './hooks/useClickOutside';
import UpdateUserAdminForm from './UpdateUserAdminForm';
import DeleteUserAdminForm from './DeleteUserAdminForm';
import UpdateReviewAdminForm from './UpdateReviewAdminForm';
import DeleteReviewAdminForm from './DeleteReviewAdminForm';

export default function ReviewAdminButton({ review }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [showModalUpdate, setShowModalUpdate] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);

	const menuRef = useRef(null);

	useClickOutside(menuRef, () => {
		if (isDropdownOpen) setIsDropdownOpen(false);
	});

	return (
		<div className="relative inline-block" ref={menuRef}>
			<button
				onClick={(e) => {
					e.stopPropagation();
					setIsDropdownOpen((prev) => !prev);
				}}
				className="flex items-center rounded bg-beige"
			>
				<EllipsisVertical />
			</button>

			{isDropdownOpen && (
				<ul className="absolute right-0 z-10 mt-1 w-48 rounded border bg-beige shadow">
					<li
						className="cursor-pointer px-4 py-2 hover:bg-gray-100"
						onClick={() => {
							setShowModalUpdate(true);
							setIsDropdownOpen(false);
						}}
					>
						Update Review
					</li>
					<li
						className="cursor-pointer px-4 py-2 hover:bg-gray-100"
						onClick={() => {
							setShowModalDelete(true);
							setIsDropdownOpen(false);
						}}
					>
						Delete Review
					</li>
				</ul>
			)}

			{showModalUpdate && (
				<Modal onClose={() => setShowModalUpdate(false)} width="max-w-3xl">
					<UpdateReviewAdminForm review={review} setShowModalUpdate={setShowModalUpdate} />
				</Modal>
			)}

			{showModalDelete && (
				<Modal onClose={() => setShowModalDelete(false)} width="max-w-xl">
					<DeleteReviewAdminForm review={review} setShowModalDelete={setShowModalDelete} />
				</Modal>
			)}
		</div>
	);
}
