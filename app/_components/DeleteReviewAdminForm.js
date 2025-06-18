'use client';

import toast from 'react-hot-toast';
import { deleteAdminReview } from '../_lib/actions';
import SubmitButton from './SubmitButton';
import { useRouter } from 'next/navigation';

export default function DeleteReviewAdminForm({ review, setShowModalDelete }) {
	const router = useRouter();

	const handleDelete = async (e) => {
		e.preventDefault();
		const result = await deleteAdminReview(review.id);

		if (result.success) {
			toast.success(result.message);
			setShowModalDelete(false);
			router.push('/management/reviews');
		} else {
			toast.error(result.message);
		}
	};
	return (
		<div>
			<h2 className="flex justify-center pb-5 text-2xl font-semibold text-textdark">
				Delete review {review?.user?.name}?
			</h2>
			<div className="mt-6 flex justify-center gap-3">
				<button
					onClick={() => setShowModalDelete(false)}
					className="w-32 rounded-3xl border border-gray-400 bg-white px-4 py-2 text-sm font-semibold text-textdark transition hover:opacity-80 disabled:opacity-80 sm:text-lg"
				>
					Cancel
				</button>
				<form onSubmit={handleDelete}>
					<SubmitButton
						pendingLabel="Deleting.."
						className="w-30 rounded-3xl bg-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-opacity-80 sm:text-lg"
					>
						Delete Review
					</SubmitButton>
				</form>
			</div>
		</div>
	);
}
