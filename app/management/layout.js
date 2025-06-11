import SideNavigation from '../_components/SideNavigation';

export default function Layout({ children }) {
	return (
		<div className="mx-auto flex h-full max-w-7xl flex-col gap-5 pt-[80px]">
			<SideNavigation />
			<div className="flex-1">{children}</div>
		</div>
	);
}
