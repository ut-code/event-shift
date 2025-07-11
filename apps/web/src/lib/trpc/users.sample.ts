import { queryClient } from "../tanstack.ts";
import { t } from "./client.ts";

export const usersQuery = t.users.list.queryOptions();
export const createUserMutation = t.users.create.mutationOptions({
	onSuccess: () => {
		queryClient.invalidateQueries({
			queryKey: usersQuery.queryKey,
		});
	},
});
export const updateUserMutation = t.users.update.mutationOptions({
	onSuccess: () => {
		queryClient.invalidateQueries({
			queryKey: usersQuery.queryKey,
		});
	},
});
export const deleteUserMutation = t.users.delete.mutationOptions({
	onSuccess: () => {
		queryClient.invalidateQueries({
			queryKey: usersQuery.queryKey,
		});
	},
});
