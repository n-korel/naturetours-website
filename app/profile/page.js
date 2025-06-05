import PasswordProfileForm from '../_components/PasswordProfileForm';
import UserProfileForm from '../_components/UserProfileForm';
import { getCurrentUser } from '../_lib/data-service';

export const metadata = {
	title: 'Profile',
};

export default async function Page() {
	const user = await getCurrentUser();

	return (
		<div className="flex flex-col gap-7">
			<UserProfileForm user={user} />
			<PasswordProfileForm />
		</div>
	);
}
