const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTours = async function () {
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
