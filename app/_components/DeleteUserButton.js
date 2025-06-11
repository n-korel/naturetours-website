'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteUser } from '../_lib/actions';
import { Trash2 } from 'lucide-react';
import SubmitButton from './SubmitButton';
import Modal from './Modal';

export default function DeleteUserButton() {
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const result = await deleteUser();
		setLoading(false);

		if (result.success) {
			toast.success(result.message);
			router.push('/');
		} else {
			toast.error(result.message);
		}
	};
	return (
		<div>
			<button
				onClick={() => setShowModal(true)}
				className="flex items-center justify-center gap-3 rounded-2xl border border-red-600 px-28 py-2 font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
			>
				<Trash2 />
				Delete Profile
			</button>
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
						<form onSubmit={handleSubmit}>
							<SubmitButton
								pendingLabel="Deleting.."
								className="rounded-full bg-red-600 px-4 py-2 text-sm text-white transition hover:opacity-80 disabled:opacity-80 sm:text-lg"
							>
								Delete Profile
							</SubmitButton>
						</form>
					</div>
				</Modal>
			)}
		</div>
	);
}
