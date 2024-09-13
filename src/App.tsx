import { Filters } from "./components/Filters";
import { UsersTable } from "./components/UsersTable";
import { useGetUsers } from "./hooks/useGetUsers";
import "./index.css";

function App() {
	const {
		users,
		isColorActive,
		sorting,
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
				<UsersTable
					users={users}
					isColorActive={isColorActive}
					deleteUser={deleteUser}
					handleSortValue={handleSortValue}
				/>
			</main>
		</>
	);
}

export default App;
