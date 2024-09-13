import type { Result } from "../interfaces/users";

export interface mappedUser {
	name: string;
	lastName: string;
	country: string;
	picture: string;
	id: string;
}

export const mapUsers = (users: Result[]): mappedUser[] => {
	const usersMapped = users.map((user) => {
		return {
			name: user.name.first,
			lastName: user.name.last,
			country: user.location.country,
			picture: user.picture.thumbnail,
			id: user.login.uuid,
		};
	});
	return usersMapped;
};
