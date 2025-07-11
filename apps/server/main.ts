import { router } from "./lib/trpc.ts";
import { usersRouter } from "./router/users.sample.ts";

export const appRouter = router({
	users: usersRouter,
});

export type AppRouter = typeof appRouter;
