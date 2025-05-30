import { getCurrentUser } from '../_lib/data-service';
import AuthButtons from './AuthButtons';
import Logo from './Logo';
import Navigation from './Navigation';

export default async function Header() {
	const user = await getCurrentUser();

	return (
		<header className="fixed left-0 right-0 top-0 z-50 bg-beige px-10 py-4 shadow-md">
			<div className="relative flex items-center justify-between">
				<Logo />

				<div className="hidden flex-1 justify-center sm:flex">
					<Navigation />
				</div>

				<div className="flex items-center gap-2 sm:gap-4">
					<AuthButtons user={user} />
				</div>
			</div>
		</header>
	);
}
