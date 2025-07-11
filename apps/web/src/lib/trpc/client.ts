import type { AppRouter } from "@apps/server";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { notNullish } from "../utils.ts";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { queryClient } from "../tanstack.ts";

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

export const t = createTRPCOptionsProxy({
	client: trpc,
	queryClient,
});
