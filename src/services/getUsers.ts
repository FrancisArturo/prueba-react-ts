import type { Data } from "../interfaces/users";
import {} from "../interfaces/users";

const API_URL = "https://randomuser.me/api/?results=10&seed=johndoe&page=";

export const getUsers = async (page: number): Promise<Data> => {
	const res = await fetch(`${API_URL}${page}`);
	if (!res.ok) throw new Error("error en la petición");
	const data = await res.json();
	return data;
};
