'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { updateUser } from '../_lib/actions';

export default function UserProfileForm({ user }) {
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [photoPreview, setPhotoPreview] = useState(user.photo);
	const [photoFile, setPhotoFile] = useState(null);
	const fileInputRef = useRef(null);
	const [loading, setLoading] = useState(false);

	const handlePhotoChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPhotoPreview(URL.createObjectURL(file));
			setPhotoFile(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		if (photoFile) {
			formData.append('photo', photoFile);
		}

		const result = await updateUser(formData);
		setLoading(false);

		if (result.success) {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="mx-auto my-8 flex max-w-4xl flex-col items-center gap-12 md:flex-row"
		>
			<div className="flex flex-col items-center gap-4">
				<img
					src={photoPreview}
					alt="User avatar"
					className="h-50 w-50 rounded-full object-cover shadow"
				/>

				<input
					name="photo"
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
					Choose new photo
				</button>
			</div>

			<div className="flex w-full flex-col gap-6">
				<h2 className="text-center text-3xl font-bold text-gray-800 md:text-left">Your Account</h2>

				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-600">Name</label>
					<input
						name="name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-600">Email</label>
					<input
						name="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
					/>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						disabled={loading}
						className="mt-4 w-40 rounded-3xl bg-orange py-3 font-semibold text-white transition hover:bg-opacity-90"
					>
						{loading ? 'Saving...' : 'Save changes'}
					</button>
				</div>
			</div>
		</form>
	);
}
