'use server';

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

		return { success: true, message: 'Sign up successful!' };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong' };
	}
}

export async function logoutUser() {
	const cookieStore = cookies();
	cookieStore.delete('token');
	await signOut({ redirectTo: '/' });
}

export async function signInAction() {
	await signIn('google', { redirectTo: '/profile' });
}

export async function signOutAction() {
	await signOut({ redirectTo: '/' });
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
