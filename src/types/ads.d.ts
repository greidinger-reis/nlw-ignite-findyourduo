import { AdsRouter } from "../server/trpc/router/ads";
import { inferProcedureInput } from "@trpc/server";

export type AdMutationInput = inferProcedureInput<AdsRouter["createAd"]>;
