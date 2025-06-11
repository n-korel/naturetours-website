'use client';

import { useState } from 'react';
import { logoutUser } from '../_lib/actions';
import Modal from './Modal';
import SubmitButton from './SubmitButton';

export default function LogoutForm() {
	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<button
				onClick={() => setShowModal(true)}
				className="rounded-full bg-orange px-4 py-2 text-sm text-white transition hover:opacity-80 sm:text-lg"
			>
				Logout
			</button>

			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<h2 className="text-lg font-semibold text-textdark">Are you sure you want to logout?</h2>
					<div className="mt-6 flex justify-end gap-3">
						<button
							onClick={() => setShowModal(false)}
							className="rounded-full border border-gray-400 bg-white px-4 py-2 text-sm text-textdark transition hover:opacity-80 disabled:opacity-80 sm:text-lg"
						>
							Cancel
						</button>
						<form action={logoutUser}>
							<SubmitButton
								pendingLabel="Logout"
								className="rounded-full bg-orange px-4 py-2 text-sm text-white transition hover:opacity-80 disabled:opacity-80 sm:text-lg"
							>
								Logout
							</SubmitButton>
						</form>
					</div>
				</Modal>
			)}
		</div>
	);
}
