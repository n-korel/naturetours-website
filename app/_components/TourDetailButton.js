'use client';

import { EllipsisVertical } from 'lucide-react';
import { useRef, useState } from 'react';
import Modal from './Modal';
import useClickOutside from './hooks/useClickOutside';
import { deleteTour } from '../_lib/actions';
import SubmitButton from './SubmitButton';

export default function TourDetailButton({ isOpen, onToggle, tourId, tourName }) {
	const [showModalUpdate, setShowModalUpdate] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const menuRef = useRef(null);

	useClickOutside(menuRef, () => {
		if (isOpen) onToggle();
	});

	const handleDelete = async (e) => {
		e.preventDefault();
		const result = await deleteTour(tourId);

		if (result.success) {
			toast.success(result.message);
			router.push('/management');
		} else {
			toast.error(result.message);
		}
	};

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
				<Modal onClose={() => setShowModalUpdate(false)}>
					<h2 className="text-lg font-semibold text-textdark">Update {tourName} Tour</h2>
					<div className="mt-6 flex justify-end gap-3">
						<button
							onClick={() => setShowModalUpdate(false)}
							className="rounded-full border border-gray-400 bg-white px-4 py-2 text-sm text-textdark transition hover:opacity-80 disabled:opacity-80 sm:text-lg"
						>
							Cancel
						</button>
						<form onSubmit={handleSubmit}>
							<SubmitButton
								pendingLabel="Updating.."
								className="rounded-full bg-red-600 px-4 py-2 text-sm text-white transition hover:opacity-80 disabled:opacity-80 sm:text-lg"
							>
								Update Tour
							</SubmitButton>
						</form>
					</div>
				</Modal>
			)}

			{showModalDelete && (
				<Modal onClose={() => setShowModalDelete(false)}>
					<h2 className="text-lg font-semibold text-textdark">Update {tourName} Tour</h2>
					<div className="mt-6 flex justify-end gap-3">
						<button
							onClick={() => setShowModalDelete(false)}
							className="rounded-full border border-gray-400 bg-white px-4 py-2 text-sm text-textdark transition hover:opacity-80 disabled:opacity-80 sm:text-lg"
						>
							Cancel
						</button>
						<form onSubmit={handleDelete}>
							<SubmitButton
								pendingLabel="Deleting.."
								className="rounded-full bg-red-600 px-4 py-2 text-sm text-white transition hover:opacity-80 disabled:opacity-80 sm:text-lg"
							>
								Delete Tour
							</SubmitButton>
						</form>
					</div>
				</Modal>
			)}
		</div>
	);
}
