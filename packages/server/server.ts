import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./main.ts";
import cors from "cors";

const port = process.env.PORT ?? 3000;
createHTTPServer({
	middleware: cors(),
	router: appRouter,
	createContext: () => {
		// create context. context can be accessed from any route.
		return {};
	},
}).listen(port, () => {
	console.log(`Server running on port ${port}`);
});
