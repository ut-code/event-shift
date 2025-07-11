import type { AppRouter } from "@apps/server";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { notNullish } from "./utils.ts";

export const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: notNullish<string>(
				import.meta.env.PUBLIC_TRPC_SERVER_URL,
				"PUBLIC_TRPC_SERVER_URL",
			),
		}),
	],
});
