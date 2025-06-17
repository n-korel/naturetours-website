import UserDetailButton from './UserDetailButton';

export default async function UserAdminString({ user, isOpen, onToggle }) {
	return (
		<div className="flex border border-t border-gray-200 text-base font-normal text-textdark">
			<div className="flex flex-1 items-center gap-5 whitespace-nowrap border p-2 text-lg font-medium">
				<img
					src={`/img/users/${user?.photo}` ?? '/img/users/default.jpg'}
					alt={user?.name ?? user._id}
					className="h-14 w-14 rounded-full"
					referrerPolicy="no-referrer"
				/>
				{user.name ?? 'User'}
			</div>
			<div className="flex flex-1 items-center border p-2">{user.role}</div>
			<div className="flex flex-1 items-center justify-between border p-2">
				<div>{user.email}</div>
				<UserDetailButton isOpen={isOpen} onToggle={onToggle} user={user} />
			</div>
		</div>
	);
}
