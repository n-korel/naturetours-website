import { cookies } from 'next/headers';
import { auth } from '../_lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ratingRange = {
	'<2.5': { lte: 2.5 },
	'2.5-4.5': { gte: 2.5, lte: 4.5 },
	'4.5-5': { gte: 4.5 },
};

const durationRange = {
	'<3': { lte: 3 },
	'3-5': { gte: 3, lte: 5 },
	'>5': { gte: 5 },
};

const priceRange = {
	'<500': { lte: 500 },
	'500-1500': { gte: 500, lte: 1500 },
	'>1500': { gte: 1500 },
};

const mappings = [
	{ key: 'rating', paramName: 'ratingsAverage', map: ratingRange },
	{ key: 'duration', paramName: 'duration', map: durationRange },
	{ key: 'price', paramName: 'price', map: priceRange },
];

export const getTours = async function (searchParams) {
	const params = new URLSearchParams();

	if (searchParams.difficulty) {
		params.set('difficulty', searchParams.difficulty);
	}

	if (searchParams.sort) {
		params.set('sort', searchParams.sort);
	}

	if (searchParams.page) {
		params.set('page', searchParams.page);
	}
	if (searchParams.limit) {
		params.set('limit', searchParams.limit);
	}

	mappings.forEach(({ key, paramName, map }) => {
		const range = map[searchParams[key]];
		if (range) {
			if (range.gte !== undefined) {
				params.set(`${paramName}[gte]`, range.gte);
			}
			if (range.lte !== undefined) {
				params.set(`${paramName}[lte]`, range.lte);
			}
		}
	});

	try {
		const res = await fetch(`${API_URL}api/v1/tours?${params.toString()}`, {
			next: { revalidate: 60 },
		});

		if (!res.ok) return null;

		const json = await res.json();
		const tours = json.data?.data;
		const total = json.results;
		return { tours, total };
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getToursSSG = async function () {
	try {
		const res = await fetch(`${API_URL}api/v1/tours`, {
			next: { revalidate: 60 },
		});

		if (!res.ok) {
			return null;
		}

		const json = await res.json();
		const tours = json.data?.data;

		return tours;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getTour = async function (id) {
	try {
		const res = await fetch(`${API_URL}api/v1/tours/${id}`, {
			next: { revalidate: 60 },
		});

		if (!res.ok) {
			return null;
		}

		const json = await res.json();
		const tour = json.data?.data;
		return tour;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getTourId = async function (slug) {
	try {
		const res = await fetch(`${API_URL}api/v1/tours?slug=${slug}`, {
			next: { revalidate: 60 },
		});

		if (!res.ok) {
			return null;
		}

		const json = await res.json();
		const tourId = json.data?.data?.[0];

		if (!tourId) {
			return null;
		}

		return tourId;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const getUserFromNextAuth = async function () {
	try {
		const session = await auth();

		if (!session) {
			return null;
		}
		const user = {
			name: session.user.name,
			email: session.user.email,
			photo: session.user.image,
			role: 'user',
			from: 'nextauth',
		};

		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const getUserFromApi = async function () {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get('token');

		if (!token) {
			return null;
		}

		const res = await fetch(`${API_URL}api/v1/users/me`, {
			headers: {
				Authorization: `Bearer ${token.value}`,
			},
		});

		if (!res.ok) {
			return null;
		}

		const json = await res.json();
		const apiUser = json.data?.data;

		const user = {
			name: apiUser.name,
			email: apiUser.email,
			photo: `/img/users/${apiUser.photo}`,
			role: apiUser.role,
			from: 'api',
		};

		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getCurrentUser = async function () {
	let user = null;

	user = await getUserFromNextAuth();

	if (!user) {
		user = await getUserFromApi();
	}

	return user;
};

export const getAllUsers = async function (page, limit, sort) {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get('token');

		if (!token) return { reviews: [], total: 0 };

		const res = await fetch(`${API_URL}api/v1/users?page=${page}&limit=${limit}&sort=${sort}`, {
			headers: {
				Authorization: `Bearer ${token.value}`,
			},
			next: { revalidate: 60 },
		});

		if (!res.ok) return { reviews: [], total: 0 };

		const json = await res.json();

		const users = json.data?.data || [];
		const total = json.results || 0;

		return { users, total };
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getAllReviews = async function (page, limit, sort = 0) {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get('token');

		if (!token) return { reviews: [], total: 0 };

		const res = await fetch(`${API_URL}api/v1/reviews?page=${page}&limit=${limit}&sort=${sort}`, {
			headers: {
				Authorization: `Bearer ${token.value}`,
			},
		});

		if (!res.ok) return { reviews: [], total: 0 };

		const json = await res.json();

		const reviews = json.data?.data || [];
		const total = json.results || 0;

		return { reviews, total };
	} catch (error) {
		console.error(error);
		return null;
	}
};
