import { AdsRouter } from "../server/trpc/router/ads";
import { inferProcedureInput, inferProcedureOutput } from "@trpc/server";

type AdQueryOutput = inferProcedureOutput<AdsRouter["getAdsByGameSlug"]>;

export type Ad = AdQueryOutput[number];
export type CreateAdInput = inferProcedureInput<AdsRouter["createAd"]>;
export type UpdateAdInput = inferProcedureInput<AdsRouter["updateAd"]>;
