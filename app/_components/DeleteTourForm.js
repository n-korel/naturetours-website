import { deleteTour } from '../_lib/actions';
import SubmitButton from './SubmitButton';

export default function DeleteTourForm({ tour, setShowModalDelete }) {
	const handleDelete = async (e) => {
		e.preventDefault();
		const result = await deleteTour(tour.id);

		if (result.success) {
			toast.success(result.message);
			router.push('/management');
		} else {
			toast.error(result.message);
		}
	};
	return (
		<div>
			<h2 className="flex justify-center pb-5 text-2xl font-semibold text-textdark">
				Delete {tour.name} Tour?
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
						Delete Tour
					</SubmitButton>
				</form>
			</div>
		</div>
	);
}
