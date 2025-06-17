import { getAllUsers } from '../_lib/data-service';
import Pagination from './Pagination';
import UsersAdminList from './UsersAdminList';

export default async function UsersAdminTable({ searchParams }) {
	const page = Number(searchParams.page || 1);
	const sort = searchParams.sort || '';
	const limit = 10;

	const { users } = await getAllUsers(page, limit, sort);
	if (!users) return {};
	const allUsers = await getAllUsers();
	const totalPages = Math.ceil(allUsers.total / limit);

	return (
		<div className="w-full">
			<div className="rounded-xl border border-gray-200">
				<div className="flex rounded-t-lg bg-gray-300 text-lg font-semibold text-textdark">
					<div className="flex-1 border p-2">User</div>
					<div className="flex-1 border p-2">Role</div>
					<div className="flex-1 border p-2">Email</div>
				</div>
				<UsersAdminList users={users} />
			</div>

			<Pagination totalPages={totalPages} currentPage={page} basePath="/management/users" />
		</div>
	);
}
