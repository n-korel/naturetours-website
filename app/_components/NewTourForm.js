'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { createNewTour } from '../_lib/actions';
import SubmitButton from './SubmitButton';
import { toast } from 'react-hot-toast';

export default function NewTourForm() {
	const router = useRouter();
	const formRef = useRef();
	const fileInputRef = useRef();

	const [preview, setPreview] = useState(null);

	const handlePhotoChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = formRef.current;
		const formData = new FormData(form);

		if (fileInputRef.current?.files[0]) {
			const file = fileInputRef.current.files[0];
			formData.set('imageCover', file, file.name);
		}

		const result = await createNewTour(formData);

		if (result.success) {
			toast.success(result.message);
			router.push('/management');
		} else {
			toast.error(result.message);
			formRef.current?.reset();
			setPreview(null);
		}
	};

	return (
		<div className="rounded-2xl border border-slate-300 p-8 shadow-lg">
			<h2 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-left">
				Create New Tour
			</h2>

			<form
				ref={formRef}
				onSubmit={handleSubmit}
				className="flex flex-col gap-10 md:flex-row md:items-start"
			>
				<div className="flex flex-col items-center gap-4">
					<img
						src={preview || '/placeholder.jpg'}
						alt="Preview"
						className="h-36 w-36 rounded-full object-cover shadow-md"
						referrerPolicy="no-referrer"
					/>
					<input
						name="imageCover"
						type="file"
						accept="image/*"
						ref={fileInputRef}
						onChange={handlePhotoChange}
						className="hidden"
					/>
					<button
						type="button"
						onClick={() => fileInputRef.current.click()}
						className="text-sm font-medium text-green-700 underline hover:text-green-900"
					>
						Choose image
					</button>
				</div>

				<div className="flex w-full flex-col gap-6">
					{[
						{ label: 'Name', name: 'name', type: 'text' },
						{ label: 'Duration (days)', name: 'duration', type: 'number' },
						{ label: 'Max Group Size', name: 'maxGroupSize', type: 'number' },
						{ label: 'Difficulty', name: 'difficulty', type: 'text' },
						{ label: 'Price ($)', name: 'price', type: 'number' },
						{ label: 'Summary', name: 'summary', type: 'text' },
					].map(({ label, name, type }) => (
						<div key={name} className="flex flex-col gap-2">
							<label htmlFor={name} className="text-sm font-medium text-gray-600">
								{label}
							</label>
							<input
								id={name}
								name={name}
								type={type}
								required
								className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
							/>
						</div>
					))}

					<div className="flex justify-end">
						<SubmitButton
							pendingLabel="Saving..."
							className="w-40 rounded-3xl bg-orange py-3 font-semibold text-white transition hover:bg-opacity-80 disabled:bg-opacity-80"
						>
							Create new Tour
						</SubmitButton>
					</div>
				</div>
			</form>
		</div>
	);
}
