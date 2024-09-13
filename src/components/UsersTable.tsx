import type { mappedUser } from "../services/mapUsers";
import { SortBy } from "../types.d";

type Props = {
	users: mappedUser[];
	isColorActive: boolean;
	deleteUser: (id: string) => void;
	handleSortValue: (value: SortBy) => void;
};

export const UsersTable: React.FC<Props> = ({
	users,
	isColorActive,
	deleteUser,
	handleSortValue,
}) => {
	return (
		<>
			<table width="100%">
				<thead>
					<tr>
						<th scope="col">Foto</th>
						<th
							scope="col"
							onClick={() => handleSortValue(SortBy.NAME)}
							onKeyDown={() => handleSortValue(SortBy.NAME)}
							className="pointer"
						>
							Nombre
						</th>
						<th
							scope="col"
							onClick={() => handleSortValue(SortBy.LAST)}
							onKeyDown={() => handleSortValue(SortBy.LAST)}
							className="pointer"
						>
							Apellido
						</th>
						<th
							scope="col"
							onClick={() => handleSortValue(SortBy.COUNTRY)}
							onKeyDown={() => handleSortValue(SortBy.COUNTRY)}
							className="pointer"
						>
							País
						</th>
						<th scope="col">Acciones</th>
					</tr>
				</thead>
				<tbody className={isColorActive ? "table--showColors" : "table"}>
					{users?.map((user) => {
						// const backgroundColor = index % 2 === 0 ? "#333" : "#555";
						// const color = isColorActive ? backgroundColor : "transparent";
						return (
							<tr key={user.id}>
								<td>
									<img src={user.picture} alt={user.name} />
								</td>
								<td>{user.name}</td>
								<td>{user.lastName}</td>
								<td>{user.country}</td>
								<td>
									<button type="button" onClick={() => deleteUser(user.id)}>
										Borrar
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};
