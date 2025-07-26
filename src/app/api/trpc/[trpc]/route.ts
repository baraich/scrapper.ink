import { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/trpc/routers/_app";
import { createTRPCContext } from "@/trpc/init";

const handler = (request: NextRequest) =>
  fetchRequestHandler({
    req: request,
    endpoint: "/api/trpc",
    router: appRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
