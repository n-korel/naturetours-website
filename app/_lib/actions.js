'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { signIn, signOut } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(formData) {
	try {
		const email = formData.get('email');
		const password = formData.get('password');

		const res = await fetch(`${API_URL}api/v1/users/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		if (!res.ok) {
			return { success: false, message: 'Invalid email or password' };
		}

		const data = await res.json();

		const cookieStore = cookies();
		cookieStore.set('token', data.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 60 * 60 * 24 * 7, // 1 week
		});

		cookieStore.set('role', data.data.user.role, {
			httpOnly: false,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
		});

		return { success: true, message: 'Login successful!' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong' };
	}
}

export async function signupUser(formData) {
	try {
		const name = formData.get('name');
		const email = formData.get('email');
		const password = formData.get('password');
		const passwordConfirm = formData.get('passwordConfirm');

		const res = await fetch(`${API_URL}api/v1/users/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, password, passwordConfirm }),
		});

		if (!res.ok) {
			return { success: false, message: 'Invalid email or password' };
		}

		const data = await res.json();

		const cookieStore = cookies();
		cookieStore.set('token', data.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 60 * 60 * 24 * 7, // 1 week
		});

		cookieStore.set('role', data.data.user.role, {
			httpOnly: false,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
		});

		revalidatePath('/');

		return { success: true, message: 'Sign up successful!' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong' };
	}
}

export async function logoutUser() {
	const cookieStore = cookies();
	cookieStore.delete('token');
	cookieStore.delete('role');
	await signOut({ redirectTo: '/' });
}

export async function signInAction() {
	const cookieStore = cookies();

	cookieStore.set('role', 'user', {
		httpOnly: false,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
	});
	await signIn('google', { redirectTo: '/' });
}

export async function forgotPassword(formData) {
	try {
		const email = formData.get('email');
		const res = await fetch(`${API_URL}api/v1/users/forgotPassword`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});

		if (!res.ok) {
			return { success: false, message: 'Ошибка отправки email' };
		}

		return { success: true, message: 'Email отправлен!' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong' };
	}
}

export async function updateUser(formData) {
	try {
		const name = formData.get('name');
		const email = formData.get('email');
		const photo = formData.get('photo');

		const cookieStore = cookies();
		const token = cookieStore.get('token');

		if (!token?.value) {
			return { success: false, message: 'Not authenticated' };
		}

		const body = new FormData();
		body.append('name', name);
		body.append('email', email);
		body.append('photo', photo);

		const res = await fetch(`${API_URL}api/v1/users/updateMe`, {
			method: 'PATCH',
			headers: { Authorization: `Bearer ${token.value}` },
			body: body,
		});

		if (!res.ok) {
			return { success: false, message: 'Invalid name, email or photo' };
		}

		await Promise.all([revalidatePath('/'), revalidatePath('/profile')]);

		return { success: true, message: 'Change successful!' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong' };
	}
}

export async function updatePassword(formData) {
	try {
		const passwordCurrent = formData.get('passwordCurrent');
		const password = formData.get('password');
		const passwordConfirm = formData.get('passwordConfirm');

		const cookieStore = cookies();
		const token = cookieStore.get('token');

		if (!token?.value) {
			return { success: false, message: 'Not authenticated' };
		}

		const res = await fetch(`${API_URL}api/v1/users/updateMyPassword`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.value}` },
			body: JSON.stringify({ passwordCurrent, password, passwordConfirm }),
		});

		if (!res.ok) {
			const data = await res.json();
			return { success: false, message: data.message || 'Invalid password' };
		}

		return { success: true, message: 'Change password successful!' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong' };
	}
}

export async function deleteUser() {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get('token');

		if (!token?.value) {
			return { success: false, message: 'Not authenticated' };
		}

		const res = await fetch(`${API_URL}api/v1/users/deleteMe`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token.value}` },
		});

		if (!res.ok) {
			return { success: false, message: 'Delete error' };
		}

		cookieStore.delete('token');
		cookieStore.delete('role');

		return { success: true, message: 'Delete successful!' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong' };
	}
}

export async function addReview(formData, tourId) {
	try {
		const review = formData.get('review');
		const rating = Number(formData.get('rating'));

		const cookieStore = cookies();
		const token = cookieStore.get('token');

		if (!token?.value) {
			return { success: false, message: 'Not authenticated' };
		}

		const res = await fetch(`${API_URL}api/v1/tours/${tourId}/reviews`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${token.value}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({ review, rating }),
		});

		console.log(JSON.stringify({ review, rating }));
		if (!res.ok) {
			return { success: false, message: 'Invalid review' };
		}

		return { success: true, message: 'Add review successful!' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong' };
	}
}

export async function createNewTour(formData) {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get('token');

		if (!token?.value) {
			return { success: false, message: 'Not authenticated' };
		}

		const res = await fetch(`${API_URL}api/v1/tours`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${token.value}` },
			body: formData,
		});

		if (!res.ok) {
			return { success: false, message: 'Invalid data' };
		}

		revalidatePath('/management');

		return { success: true, message: 'Tour created successfully!' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong' };
	}
}

export async function updateNewTour(formData, tourId) {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get('token');

		if (!token?.value) {
			return { success: false, message: 'Not authenticated' };
		}

		const res = await fetch(`${API_URL}api/v1/tours/${tourId}`, {
			method: 'PATCH',
			headers: { Authorization: `Bearer ${token.value}` },
			body: formData,
		});

		if (!res.ok) {
			return { success: false, message: 'Invalid data' };
		}

		revalidatePath('/management');

		return { success: true, message: 'Tour updated successfully!' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong' };
	}
}

export async function deleteTour(tourId) {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get('token');

		if (!token?.value) {
			return { success: false, message: 'Not authenticated' };
		}

		const res = await fetch(`${API_URL}api/v1/tours/${tourId}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token.value}` },
		});

		if (!res.ok) {
			return { success: false, message: 'Delete error' };
		}

		revalidatePath('/management');

		return { success: true, message: 'Delete successful!' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong' };
	}
}

export async function updateAdminUser(formData, userId) {
	try {
		const name = formData.get('name');
		const email = formData.get('email');
		const photo = formData.get('photo');

		const cookieStore = cookies();
		const token = cookieStore.get('token');

		if (!token?.value) {
			return { success: false, message: 'Not authenticated' };
		}

		const body = new FormData();
		body.append('name', name);
		body.append('email', email);
		body.append('photo', photo);

		const res = await fetch(`${API_URL}api/v1/users/${userId}`, {
			method: 'PATCH',
			headers: { Authorization: `Bearer ${token.value}` },
			body: body,
		});

		if (!res.ok) {
			return { success: false, message: 'Invalid name, email or photo' };
		}

		revalidatePath('/management/users');

		return { success: true, message: 'Change successful!' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong' };
	}
}

export async function deleteAdminUser(userId) {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get('token');

		if (!token?.value) {
			return { success: false, message: 'Not authenticated' };
		}

		const res = await fetch(`${API_URL}api/v1/users/${userId}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token.value}` },
		});

		if (!res.ok) {
			return { success: false, message: 'Delete error' };
		}

		return { success: true, message: 'Delete successful!' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong' };
	}
}
