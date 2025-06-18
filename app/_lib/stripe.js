'use client';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export async function bookTour(tourId) {
	try {
		const stripe = await stripePromise;

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookings/checkout-session/${tourId}`,
			{
				method: 'GET',
				credentials: 'include',
			},
		);

		const data = await res.json();

		if (!res.ok) {
			return { success: false, message: 'Payment failed' };
		}

		await stripe.redirectToCheckout({
			sessionId: data.session.id,
		});
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Payment failed' };
	}
}
