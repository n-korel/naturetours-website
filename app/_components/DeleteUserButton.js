'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteUser } from '../_lib/actions';
import { Trash2 } from 'lucide-react';

export default function DeleteUserButton() {
	const [loading, setLoading] = useState(false);

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
		<form onSubmit={handleSubmit}>
			<button
				type="submit"
				disabled={loading}
				className="flex items-center justify-center gap-3 rounded-2xl border border-red-600 px-28 py-2 font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
			>
				<Trash2 />
				{loading ? 'Deleting...' : 'Delete profile'}
			</button>
		</form>
	);
}
