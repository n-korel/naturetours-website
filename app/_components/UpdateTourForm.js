'use client';

import { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { updateNewTour } from '../_lib/actions';
import SubmitButton from './SubmitButton';
import { useRouter } from 'next/navigation';

export default function UpdateTourForm({ tour, setShowModalUpdate }) {
	const router = useRouter();
	const fileCoverRef = useRef();
	const fileImagesRef = useRef();

	const [name, setName] = useState(tour.name);
	const [duration, setDuration] = useState(tour.duration);
	const [maxGroupSize, setMaxGroupSize] = useState(tour.maxGroupSize);
	const [difficulty, setDifficulty] = useState(tour.difficulty);
	const [price, setPrice] = useState(tour.price);
	const [summary, setSummary] = useState(tour.summary);

	const [coverPreview, setCoverPreview] = useState(tour.imageCover);
	const [coverFile, setCoverFile] = useState(null);

	const [imageFiles, setImageFiles] = useState([]);
	const [imagePreviews, setImagePreviews] = useState(tour.images || []);

	useEffect(() => {
		if (imageFiles.length > 0) {
			const previews = imageFiles.map((file) => URL.createObjectURL(file));
			setImagePreviews(previews);
		}
	}, [imageFiles]);

	const handleCoverChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setCoverPreview(URL.createObjectURL(file));
			setCoverFile(file);
		}
	};

	const handleImagesChange = (e) => {
		const files = Array.from(e.target.files);
		if (files.length > 0) {
			setImageFiles(files);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('name', name);
		formData.append('duration', duration);
		formData.append('maxGroupSize', maxGroupSize);
		formData.append('difficulty', difficulty);
		formData.append('price', price);
		formData.append('summary', summary);

		if (coverFile) {
			formData.append('imageCover', coverFile);
		}

		imageFiles.forEach((file) => {
			formData.append('images', file);
		});

		const result = await updateNewTour(formData, tour._id);

		if (result.success) {
			toast.success(result.message);
			router.refresh();
			setShowModalUpdate(false);
		} else {
			toast.error(result.message);
		}
	};

	return (
		<div className="w-full p-4">
			<h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Update {tour.name} Tour</h2>

			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<div className="flex items-center gap-10">
					<div className="flex flex-col items-center">
						<img
							src={`/img/tours/${coverPreview ? coverPreview : 'tours.jpg'}`}
							alt="Cover Preview"
							className="h-64 w-72 rounded object-cover shadow-md"
						/>
						<input
							type="file"
							accept="image/*"
							ref={fileCoverRef}
							onChange={handleCoverChange}
							className="hidden"
						/>
						<button
							type="button"
							onClick={() => fileCoverRef.current.click()}
							className="mt-2 text-sm font-medium text-green-700 underline"
						>
							Choose cover
						</button>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-600">Gallery Images</label>
						<input
							type="file"
							accept="image/*"
							multiple
							ref={fileImagesRef}
							onChange={handleImagesChange}
							className="rounded-md border p-1"
						/>
						<div className="mt-2 flex flex-wrap justify-center gap-2">
							{imagePreviews.map((src, i) => (
								<img
									key={i}
									src={`/img/tours/${src}`}
									alt={`preview-${i}`}
									className="h-24 w-24 rounded border object-cover"
								/>
							))}
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{[
						{ label: 'Name', value: name, set: setName, name: 'name', type: 'text' },
						{
							label: 'Duration (days)',
							value: duration,
							set: setDuration,
							name: 'duration',
							type: 'number',
						},
						{
							label: 'Max Group Size',
							value: maxGroupSize,
							set: setMaxGroupSize,
							name: 'maxGroupSize',
							type: 'number',
						},
						{
							label: 'Difficulty',
							value: difficulty,
							set: setDifficulty,
							name: 'difficulty',
							type: 'text',
						},
						{ label: 'Price ($)', value: price, set: setPrice, name: 'price', type: 'number' },
						{ label: 'Summary', value: summary, set: setSummary, name: 'summary', type: 'text' },
					].map(({ label, value, set, name, type }) => (
						<div key={name} className="flex flex-col">
							<label htmlFor={name} className="text-sm font-medium text-gray-600">
								{label}
							</label>
							<input
								id={name}
								name={name}
								type={type}
								required
								value={value}
								onChange={(e) => set(e.target.value)}
								className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
							/>
						</div>
					))}
				</div>

				<div className="flex justify-between">
					<button
						type="button"
						onClick={() => setShowModalUpdate(false)}
						className="w-32 rounded-3xl border border-gray-400 bg-white px-4 py-2 text-sm font-semibold text-textdark transition hover:opacity-80 disabled:opacity-80 sm:text-lg"
					>
						Cancel
					</button>

					<SubmitButton
						pendingLabel="Updating..."
						className="w-30 rounded-3xl bg-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-opacity-80 sm:text-lg"
					>
						Update Tour
					</SubmitButton>
				</div>
			</form>
		</div>
	);
}
