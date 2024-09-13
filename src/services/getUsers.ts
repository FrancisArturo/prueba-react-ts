import type { Result } from "../interfaces/users";

const API_URL = "https://randomuser.me/api/?results=10";

export const getUsers = async (): Promise<Result[]> => {
	const res = await fetch(API_URL);
	const { results } = await res.json();
	return results;
};
