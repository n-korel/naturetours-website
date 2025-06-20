import { Umbrella, Tent, Plane, Ship, Rocket, Mountain } from 'lucide-react';

const categories = [
	{ title: 'Beach Getaway', icon: <Umbrella className="h-12 w-12 text-orange" /> },
	{ title: 'Adventure Time', icon: <Tent className="h-12 w-12 text-orange" /> },
	{ title: 'Exotic Trips', icon: <Plane className="h-12 w-12 text-orange" /> },
	{ title: 'Cruises', icon: <Ship className="h-12 w-12 text-orange" /> },
	{ title: 'Last Minute', icon: <Rocket className="h-12 w-12 text-orange" /> },
	{ title: 'Mountains', icon: <Mountain className="h-12 w-12 text-orange" /> },
];

export default function TravelCategories() {
	return (
		<section className="relative mx-auto max-w-5xl px-24">
			<h2 className="mb-10 text-center text-4xl font-bold">Travel categories</h2>
			<div className="grid grid-cols-3 justify-items-center gap-7">
				{categories.map(({ title, icon }) => (
					<div
						key={title}
						className={
							'flex h-64 w-64 flex-col items-center justify-center rounded-xl bg-lightgray text-sm font-semibold text-textdark shadow'
						}
					>
						<div className="mb-1">{icon}</div>
						<span className="pt-4 text-lg">{title}</span>
					</div>
				))}
			</div>
		</section>
	);
}
