import { GamesRouter } from "../server/trpc/router/games";
import { inferProcedureOutput } from "@trpc/server";

export type AllGamesQueryOutput = inferProcedureOutput<
  GamesRouter["getAllGames"]
>;

export type GameBySlugQueryOutput = inferProcedureOutput<
  GamesRouter["getGameBySlug"]
>;
