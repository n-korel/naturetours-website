import Logo from './Logo';
import Navigation from './Navigation';

function Header() {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-beige px-10 py-4 shadow-sm">
			<div className="relative flex items-center justify-between">
				<Logo />

				<div className="absolute left-1/2 -translate-x-1/2">
					<Navigation />
				</div>

				<div className="flex items-center gap-4">
					<button className="px-4 py-2 rounded-full text-lg text-textdark hover:bg-lightgray transition">
						Log in
					</button>
					<button className="px-4 py-2 rounded-full text-lg bg-orange text-white hover:opacity-90 transition">
						Sign up
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;
