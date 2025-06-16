'use client';

import TourAdminString from './TourAdminString';
import { useState } from 'react';

export default function TourAdminList({ tours }) {
	const [openDropdownId, setOpenDropdownId] = useState(null);

	function handleToggle(id) {
		setOpenDropdownId((prevId) => (prevId === id ? null : id));
	}

	return (
		<div>
			{tours?.map((tour) => (
				<TourAdminString
					key={tour.id}
					tour={tour}
					isOpen={openDropdownId === tour.id}
					onToggle={() => handleToggle(tour.id)}
				/>
			))}
		</div>
	);
}
