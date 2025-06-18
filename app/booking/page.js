'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export const metadata = {
	title: 'Booking',
};

export default function Page() {
	const searchParams = useSearchParams();
	const alert = searchParams.get('alert');

	useEffect(() => {
		if (alert === 'booking') {
			toast.success('🎉 Booking successful!');
		}
		if (alert === 'cancel') {
			toast.error('❌ Payment was canceled');
		}
	}, [alert]);

	return (
		<main className="p-6">
			<h1 className="text-2xl font-bold">Your booked tours</h1>
			{/* Загрузка списка туров */}
		</main>
	);
}
