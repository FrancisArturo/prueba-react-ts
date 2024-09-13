import { useEffect, useRef, useState } from "react";
import { getUsers } from "../services/getUsers";
import { type mappedUser, mapUsers } from "../services/mapUsers";
import { SortBy } from "../types.d";

export const useGetUsers = () => {
	const [users, setUsers] = useState<mappedUser[]>([]);
	const [isColorActive, setIsColorActive] = useState(false);
	const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);

	const originalUsers = useRef<mappedUser[]>([]); // useRef -> para guardar un valor
	// que queremos que se comparta entre renderizados
	// pero que al cambiar, no vuelva a renderizar el componente

	const handleGetUsers = async () => {
		const usersDataReceived = await getUsers();
		const usersMapped = mapUsers(usersDataReceived);
		setUsers(usersMapped);
		originalUsers.current = [...usersMapped];
	};

	const handleSortValue = (value: SortBy) => {
		setSorting(value);
	};

	const deleteUser = (id: string) => {
		const filteredUsers = users.filter((user) => user.id !== id);
		setUsers([...filteredUsers]);
	};

	const handleResetState = () => {
		setUsers(originalUsers.current);
	};

	const handleSearchByCountry = (value: string) => {
		console.log("filtrar");
		const foundUsers = originalUsers.current.filter((user) => {
			return user.country.toLowerCase().includes(value.toLowerCase());
		});
		setUsers([...foundUsers]);
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

	// biome-ignore lint/correctness/useExhaustiveDependencies(handleGetUsers): <explanation>
	useEffect(() => {
		handleGetUsers();
	}, []);

	return {
		users: sorting !== "none" ? sortedUsers() : users,
		isColorActive,
		sorting,
		setSorting,
		handleSortValue,
		setIsColorActive,
		setUsers,
		handleGetUsers,
		deleteUser,
		handleResetState,
		handleSearchByCountry,
	};
};
