import { QueryClient } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { trpc } from "../trpc";

export const queryClient = new QueryClient();

export const t = createTRPCOptionsProxy({
	client: trpc,
	queryClient,
});
