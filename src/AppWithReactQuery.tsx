import { Filters } from "./components/Filters";
import { UsersTable } from "./components/UsersTable";
import { useGetUsersWithReactQuery } from "./hooks/useGetUsersWithReactQuery";
import "./index.css";

function AppWithReactQuery() {
	const {
		users,
		isColorActive,
		sorting,
		isLoading,
		isError,
		hasNextPage,
		fetchNextPage,
		setSorting,
		setIsColorActive,
		handleResetState,
		deleteUser,
		handleSearchByCountry,
		handleSortValue,
	} = useGetUsersWithReactQuery();

	return (
		<>
			<h1>App de usuarios</h1>
			<header>
				<Filters
					sorting={sorting}
					isColorActive={isColorActive}
					setSorting={setSorting}
					setIsColorActive={setIsColorActive}
					handleResetState={handleResetState}
					handleSearchByCountry={handleSearchByCountry}
				/>
			</header>
			<main>
				{users.length > 0 && (
					<UsersTable
						users={users}
						isColorActive={isColorActive}
						deleteUser={deleteUser}
						handleSortValue={handleSortValue}
					/>
				)}
				{isLoading && <p>Cargando...</p>}
				{!isLoading && isError && <p>{isError}</p>}
				{!isLoading && !isError && users.length === 0 && (
					<p>No hay resultados</p>
				)}
				{!isLoading && !isError && hasNextPage && (
					<button type="button" onClick={() => fetchNextPage()}>
						Cargar mas usuarios
					</button>
				)}
				{!isLoading && !isError && !hasNextPage && <p>No hay más resultados</p>}
			</main>
		</>
	);
}

export default AppWithReactQuery;
