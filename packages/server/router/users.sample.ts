import * as v from "valibot";
import { publicProcedure, router } from "../lib/trpc.ts";

type User = {
	id: string;
	name: string;
	age: number;
};

// think of this as a database or something
let users: User[] = [];

export const usersRouter = router({
	list: publicProcedure.query(() => {
		return users;
	}),
	create: publicProcedure
		.input(
			v.object({
				name: v.string(),
				age: v.number(),
			}),
		)
		.mutation(({ input }) => {
			const user: User = {
				id: crypto.randomUUID(),
				name: input.name,
				age: input.age,
			};
			users.push(user);
			return user;
		}),

	update: publicProcedure
		.input(
			v.object({
				id: v.string(),
				data: v.object({
					name: v.optional(v.string()),
					age: v.optional(v.number()),
				}),
			}),
		)
		.mutation(({ input }) => {
			users = users.map((user) =>
				user.id === input.id ? { ...user, ...input.data } : user,
			);
		}),

	delete: publicProcedure
		.input(
			v.object({
				id: v.string(),
			}),
		)
		.mutation(({ input }) => {
			users = users.filter((user) => user.id !== input.id);
		}),
});
