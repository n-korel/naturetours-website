const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTours = async function () {
	const res = await fetch(`${API_URL}api/v1/tours`);

	if (!res.ok) {
		throw new Error('Tours could not be loaded');
	}

	return res.json();
};

export const getTour = async function (id) {
	const res = await fetch(`${API_URL}api/v1/tours/${id}`);

	if (!res.ok) {
		throw new Error('Tour could not be loaded');
	}

	return res.json();
};

export const getTourId = async function (slug) {
	const res = await fetch(`${API_URL}api/v1/tours?slug=${slug}`);

	if (!res.ok) {
		throw new Error('Tour could not be loaded');
	}

	return res.json();
};
