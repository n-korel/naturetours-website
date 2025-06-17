'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { updateAdminUser, updateUser } from '../_lib/actions';
import SubmitButton from './SubmitButton';

export default function UpdateUserAdminForm({ user, setShowModalUpdate }) {
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [photoPreview, setPhotoPreview] = useState(user.photo);
	const [photoFile, setPhotoFile] = useState(null);
	const fileInputRef = useRef(null);

	const handlePhotoChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPhotoPreview(URL.createObjectURL(file));
			setPhotoFile(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		if (photoFile) {
			formData.append('photo', photoFile);
		}

		const result = await updateAdminUser(formData, user._id);

		if (result.success) {
			toast.success(result.message);
			router.refresh();
			setShowModalUpdate(false);
		} else {
			toast.error(result.message);
		}
	};

	return (
		<div className="p-8">
			<h2 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-left">
				{user.name}
			</h2>

			<form onSubmit={handleSubmit} className="flex flex-col gap-10 md:flex-row md:items-start">
				<div className="flex flex-col items-center gap-4">
					<img
						src={`/img/users/${photoPreview}`}
						alt="User avatar"
						className="h-36 w-36 rounded-full object-cover shadow-md"
						referrerPolicy="no-referrer"
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

					<div className="flex justify-end gap-5">
						<button
							type="button"
							onClick={() => setShowModalUpdate(false)}
							className="w-36 rounded-3xl border border-gray-400 bg-white px-4 py-2 text-sm font-semibold text-textdark transition hover:opacity-80 disabled:opacity-80 sm:text-lg"
						>
							Cancel
						</button>

						<SubmitButton
							pendingLabel="Saving..."
							className="w-40 rounded-3xl bg-orange py-3 font-semibold text-white transition hover:bg-opacity-80 disabled:bg-opacity-80"
						>
							Save changes
						</SubmitButton>
					</div>
				</div>
			</form>
		</div>
	);
}
