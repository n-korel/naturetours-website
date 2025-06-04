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
		<div className="flex w-full flex-col items-center justify-center rounded-2xl border border-slate-400 shadow">
			<h2 className="mb-6 text-center text-2xl font-bold text-textdark">Your account</h2>

			<form onSubmit={handleSubmit} className="flex gap-4 space-y-6">
				<div className="flex flex-col items-center space-x-4">
					<img
						src={photoPreview}
						alt="User avatar"
						className="h-16 w-16 rounded-full object-cover"
					/>

					<div>
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
							className="text-sm text-green-600 underline hover:text-green-800"
						>
							Choose new photo
						</button>
					</div>
				</div>

				<div>
					<input
						name="name"
						type="text"
						value={name}
						className="w-full border-b border-black bg-beige p-2 focus:outline-none"
						onChange={(e) => setName(e.target.value)}
					/>

					<input
						name="email"
						type="email"
						value={email}
						className="w-full border-b border-black bg-beige p-2 focus:outline-none"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-md bg-orange py-2 font-medium text-white transition hover:opacity-90"
					>
						{loading ? 'Saving...' : 'Save changes'}
					</button>
				</div>
			</form>
		</div>
	);
}
