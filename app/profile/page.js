import PasswordProfileForm from '../_components/PasswordProfileForm';
import UserProfileForm from '../_components/UserProfileForm';
import { getCurrentUser } from '../_lib/data-service';

export const metadata = {
	title: 'Profile',
};

export default async function Page() {
	const user = await getCurrentUser();

	return (
		<div className="mx-auto flex h-full max-w-5xl flex-col gap-7 pt-[80px]">
			<UserProfileForm user={user} />
			<PasswordProfileForm />
		</div>
	);
}
