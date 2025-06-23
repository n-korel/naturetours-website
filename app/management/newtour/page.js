export const dynamic = 'force-dynamic';

import NewTourForm from '@/app/_components/NewTourForm';

export const metadata = {
	title: 'NewTour',
};

export default function Page() {
	return (
		<div>
			<NewTourForm />
		</div>
	);
}
