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
