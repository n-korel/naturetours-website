'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
	const searchParams = useSearchParams();
	const success = searchParams.get('success');
	const canceled = searchParams.get('canceled');

	useEffect(() => {
		if (success) toast.success('🎉 Booking successful!');
		if (canceled) toast.error('❌ Payment canceled');
	}, [success, canceled]);

	return (
		<main className="bg-beige">
			<section className="relative mx-auto max-w-7xl px-6 pb-4 pt-16">
				<div className="flex justify-center gap-10">
					<div className="flex flex-col justify-center">
						<h2 className="mb-4 text-2xl font-bold">Booking Status</h2>
						{success && (
							<div>
								<p className="mb-4 text-lg leading-relaxed">Your payment was successful.</p>
								<p className="mb-4 text-lg leading-relaxed">
									Thank you for booking a tour with us. <br />
									We have received your booking and our agents are working out the details.
								</p>
								<p className="mb-6 text-lg leading-relaxed">
									Our guides will contact you soon and will finish the order with you.
								</p>
							</div>
						)}

						{canceled && <p className="mb-4 text-lg leading-relaxed">Your payment was canceled.</p>}
						<div className="flex justify-center pt-10">
							<Link
								href="/"
								className="inline-block flex w-44 justify-center rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
							>
								Go to Homepage
							</Link>
						</div>
					</div>
					<div className="mx-auto flex max-w-2xl flex-col rounded-2xl bg-forest p-5 text-white">
						<div className="overflow-hidden rounded-lg p-5">
							<Image
								src={`/chill.jpg`}
								alt="Tour image"
								width={400}
								height={300}
								className="w-full rounded-2xl object-cover"
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
