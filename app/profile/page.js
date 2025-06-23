import DeleteUserButton from '../_components/DeleteUserButton';
import PasswordProfileForm from '../_components/PasswordProfileForm';
import UserProfileForm from '../_components/UserProfileForm';
import { getCurrentUser } from '../_lib/data-service';

export const metadata = {
	title: 'Profile',
};

export default async function Page() {
	const user = await getCurrentUser();
	if (!user) return <p className="p-10 text-xl">Нет данных о пользователе</p>;
	return (
		<div className="mx-auto flex h-full max-w-5xl flex-col justify-center gap-7 pt-[80px]">
			<UserProfileForm user={user} />
			<PasswordProfileForm />
			<div className="flex w-full items-center justify-center">
				<DeleteUserButton />
			</div>
		</div>
	);
}
