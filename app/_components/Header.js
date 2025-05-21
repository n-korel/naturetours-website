import Logo from './Logo';
import Navigation from './Navigation';

function Header() {
	return (
		<header className="fixed left-0 right-0 top-0 z-50 bg-beige px-10 py-4 shadow-md">
			<div className="relative flex items-center justify-between">
				<Logo />

				<div className="hidden flex-1 justify-center sm:flex">
					<Navigation />
				</div>

				<div className="flex items-center gap-2 sm:gap-4">
					<button className="rounded-full px-4 py-2 text-sm text-textdark transition hover:bg-lightgray sm:text-lg">
						Log in
					</button>
					<button className="rounded-full bg-orange px-4 py-2 text-sm text-white transition hover:opacity-90 sm:text-lg">
						Sign up
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;
