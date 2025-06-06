import { getCurrentUser } from '../_lib/data-service';
import AuthButtons from './AuthButtons';
import Logo from './Logo';
import Navigation from './Navigation';
import Link from 'next/link';

export default async function Header() {
	const user = await getCurrentUser();

	return (
		<header className="fixed left-0 right-0 top-0 z-50 bg-beige px-10 py-4 shadow-md">
			<div className="relative flex items-center justify-between">
				<Logo />

				<div className="hidden flex-1 justify-center sm:flex">
					<Navigation user={user} />
				</div>

				{user && user.role === 'admin' && (
					<Link
						href="/management"
						className="mr-3 rounded-full bg-red-500 px-3 py-1 text-base font-medium transition hover:bg-opacity-80"
					>
						{user.role}
					</Link>
				)}
				{user && user.role === 'lead-guide' && (
					<Link
						href="/management"
						className="mr-3 rounded-full bg-yellow-400 px-3 py-1 text-base font-medium transition hover:bg-opacity-80"
					>
						{user.role}
					</Link>
				)}
				{user && user.role === 'guide' && (
					<span className="mr-3 rounded-full bg-green-400 px-3 py-1 text-base font-medium">
						{user.role}
					</span>
				)}

				<div className="flex items-center gap-2 sm:gap-4">
					<AuthButtons user={user} />
				</div>
			</div>
		</header>
	);
}
