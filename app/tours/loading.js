import Spinner from '@/app/_components/Spinner';

export default function loading() {
	return (
		<div className="grid items-center justify-center py-16">
			<Spinner />
			<p className="text-xl text-primary-200">Loading tour data...</p>
		</div>
	);
}
