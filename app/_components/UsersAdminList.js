'use client';

import { useState } from 'react';
import UserAdminString from './UserAdminString';

export default function UsersAdminList({ users }) {
	const [openDropdownId, setOpenDropdownId] = useState(null);

	function handleToggle(id) {
		setOpenDropdownId((prevId) => (prevId === id ? null : id));
	}

	return (
		<div>
			{users?.map((user) => (
				<UserAdminString
					key={user._id}
					user={user}
					isOpen={openDropdownId === user._id}
					onToggle={() => handleToggle(user._id)}
				/>
			))}
		</div>
	);
}
