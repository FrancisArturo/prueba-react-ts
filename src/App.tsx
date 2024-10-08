import { Filters } from "./components/Filters";
import { UsersTable } from "./components/UsersTable";
import { useGetUsers } from "./hooks/useGetUsers";
import "./index.css";

function App() {
	const {
		users,
		isColorActive,
		sorting,
		loading,
		error,
		currentPage,
		setCurrentPage,
		setSorting,
		setIsColorActive,
		handleResetState,
		deleteUser,
		handleSearchByCountry,
		handleSortValue,
	} = useGetUsers();

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
				{loading && <p>Cargando...</p>}
				{!loading && error.status && <p>{error.message}</p>}
				{!loading && !error.status && users.length === 0 && (
					<p>No hay resultados</p>
				)}
				{!loading && !error.status && (
					<button type="button" onClick={() => setCurrentPage(currentPage + 1)}>
						Cargar mas usuarios
					</button>
				)}
			</main>
		</>
	);
}

export default App;
