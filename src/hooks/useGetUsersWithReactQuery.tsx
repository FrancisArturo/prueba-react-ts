import { useState } from "react";

import type { mappedUser } from "../services/mapUsers";
import { SortBy } from "../types.d";
import { useUsers } from "./useUsers";

export const useGetUsersWithReactQuery = () => {
	const [isColorActive, setIsColorActive] = useState(false);
	const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);

	const { users, isError, isLoading, hasNextPage, fetchNextPage, refetch } =
		useUsers();

	const handleSortValue = (value: SortBy) => {
		setSorting(value);
	};

	const deleteUser = (id: string) => {
		const filteredUsers = users.filter((user) => user.id !== id);
		return [...filteredUsers];
	};

	const handleResetState = async () => {
		await refetch();
	};

	const handleSearchByCountry = (value: string) => {
		// console.log("filtrar");
		// const foundUsers = originalUsers.current.filter((user) => {
		// 	return user.country.toLowerCase().includes(value.toLowerCase());
		// });
		// setUsers([...foundUsers]);
	};

	const sortedUsers = () => {
		const compareProperties: Record<string, (user: mappedUser) => string> = {
			[SortBy.COUNTRY]: (user) => user.country,
			[SortBy.NAME]: (user) => user.name,
			[SortBy.LAST]: (user) => user.lastName,
		};

		return [...users].sort((a, b) => {
			const extractProperty = compareProperties[sorting];
			return extractProperty(a).localeCompare(extractProperty(b));
		});
	};

	return {
		users: sorting !== "none" ? sortedUsers() : users,
		isColorActive,
		sorting,
		isLoading,
		isError,
		hasNextPage,
		fetchNextPage,
		setSorting,
		handleSortValue,
		setIsColorActive,
		deleteUser,
		handleResetState,
		handleSearchByCountry,
	};
};
