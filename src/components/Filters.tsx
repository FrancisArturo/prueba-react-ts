// import type { mappedUser } from "../services/mapUsers";

import { SortBy } from "../types.d";

type Props = {
	isColorActive: boolean;
	sorting: SortBy;
	setSorting: (value: SortBy) => void;
	setIsColorActive: (state: boolean) => void;
	handleResetState: () => void;
	handleSearchByCountry: (value: string) => void;
};

export const Filters: React.FC<Props> = ({
	sorting,
	isColorActive,
	setSorting,
	setIsColorActive,
	handleResetState,
	handleSearchByCountry,
}) => {
	const onChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		handleSearchByCountry(value);
	};

	return (
		<>
			<button
				type="button"
				onClick={
					isColorActive
						? () => setIsColorActive(false)
						: () => setIsColorActive(true)
				}
			>
				Colorear Filas
			</button>
			{sorting === "country" ? (
				<button type="button" onClick={() => setSorting(SortBy.NONE)}>
					No ordenar por país
				</button>
			) : (
				<button type="button" onClick={() => setSorting(SortBy.COUNTRY)}>
					Ordenar por país
				</button>
			)}

			<button type="button" onClick={() => handleResetState()}>
				Resetear estado
			</button>
			<input
				type="text"
				placeholder="ingrese el país"
				onChange={(e) => onChangeInputSearch(e)}
			/>
		</>
	);
};
