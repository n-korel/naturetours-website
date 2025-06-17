import Spinner from '@/app/_components/Spinner';
import UsersAdminTable from '@/app/_components/UsersAdminTable';
import UsersSorting from '@/app/_components/UsersSorting';
import { Suspense } from 'react';

export const metadata = {
	title: 'Users',
};

export default function Page({ searchParams }) {
	return (
		<main className="bg-beige pb-10 font-sans text-textdark">
			<div className="flex items-center justify-between pb-5">
				<div className="pl-3 text-3xl">All Users</div>
				<UsersSorting />
			</div>

			<Suspense fallback={<Spinner />} key={JSON.stringify(searchParams)}>
				<UsersAdminTable searchParams={searchParams} />
			</Suspense>
		</main>
	);
}
