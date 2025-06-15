import { Suspense } from 'react';
import ReviewList from '@/app/_components/ReviewList';
import Spinner from '@/app/_components/Spinner';

export const metadata = {
	title: 'Reviews',
};

export default function Page({ searchParams }) {
	return (
		<div className="mx-auto flex max-w-7xl items-center justify-between px-6">
			<div>Reviews</div>
			{/* 		<Suspense fallback={<Spinner />} key={JSON.stringify(searchParams)}>
			<ReviewList searchParams={searchParams} />
		</Suspense> */}
		</div>
	);
}
