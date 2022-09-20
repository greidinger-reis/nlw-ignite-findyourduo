// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { adsRouter } from "./ads";
import { gamesRouter } from "./games";

export const appRouter = t.router({
  games: gamesRouter,
  ads: adsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
