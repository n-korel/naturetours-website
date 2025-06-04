import UserProfileForm from '../_components/UserProfileForm';
import { getCurrentUser } from '../_lib/data-service';

export const metadata = {
	title: 'Profile',
};

export default async function Page() {
	const user = await getCurrentUser();

	return (
		<div>
			<UserProfileForm user={user} />
		</div>
	);
}
