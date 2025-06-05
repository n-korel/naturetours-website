'use client';

import { useState } from 'react';

export default function FAQ() {
	const [open, setOpen] = useState(false);

	return (
		<div className="mx-auto max-w-4xl space-y-8 p-6">
			<h2 className="mb-2 text-xl font-semibold">Bookings</h2>

			<div onClick={() => setOpen((a) => !a)} className="cursor-pointer bg-[#e5dbc4]">
				<div>
					Why has the price for the trip changed? <span>{open ? '−' : '+'}</span>
				</div>

				{open && (
					<p>
						We regret to inform you that you’ve missed out this time. Our special offers are
						available for a limited duration, and to secure great deals, it’s essential to act
						promptly. Ensure you’ve subscribed to our email newsletter to stay informed about
						upcoming sales and promotions.
					</p>
				)}
			</div>
		</div>
	);
}
