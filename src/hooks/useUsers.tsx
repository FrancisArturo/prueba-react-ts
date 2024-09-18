import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsers } from "../services/getUsers";
import { mapUsers } from "../services/mapUsers";

const handleGetUsers = async ({ pageParam }: { pageParam: number }) => {
	console.log("first");
	const { info, results } = await getUsers(pageParam);
	const usersMapped = mapUsers(results);
	const currentPage = info.page;
	const nextCursor = currentPage > 2 ? undefined : currentPage + 1;
	return {
		users: usersMapped,
		nextCursor,
	};
	// originalUsers.current = [...originalUsers.current, ...usersMapped];
};

export const useUsers = () => {
	const { isLoading, isError, data, hasNextPage, refetch, fetchNextPage } =
		useInfiniteQuery({
			queryKey: ["users"],
			queryFn: handleGetUsers,
			initialPageParam: 1,
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			refetchOnWindowFocus: false,
			// staleTime,
			// retryDelay
		});

	const users = data?.pages?.flatMap((page) => page.users) ?? [];

	return {
		users,
		originalUsers: data?.pages?.[0],
		isLoading,
		isError,
		hasNextPage,
		refetch,
		fetchNextPage,
	};
};
