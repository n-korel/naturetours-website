import PasswordProfileForm from '../_components/PasswordProfileForm';
import UserProfileForm from '../_components/UserProfileForm';
import { getCurrentUser } from '../_lib/data-service';

export const metadata = {
	title: 'Profile',
};

export default async function Page() {
	const user = await getCurrentUser();

	return (
		<div className="rounded-2xl border border-slate-400 shadow">
			<UserProfileForm user={user} />
			<PasswordProfileForm />
		</div>
	);
}
