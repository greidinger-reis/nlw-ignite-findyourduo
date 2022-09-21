import { WeekDays } from "@prisma/client";
import { z } from "zod";
import { t } from "../trpc";
import { TRPCError } from "@trpc/server";

export const adsRouter = t.router({
  getAdsByGameSlug: t.procedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const { slug } = input;
      return ctx.prisma.ad.findMany({
        where: {
          Game: {
            slug,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  createAd: t.procedure
    .input(
      z.object({
        gameId: z.string(),
        name: z.string().min(1),
        yearsPlaying: z.number(),
        discordUserId: z.number(),
        weekDays: z.array(z.nativeEnum(WeekDays)),
        hoursStart: z.string(),
        hoursEnd: z.string(),
        useVoiceChat: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        gameId,
        name,
        yearsPlaying,
        discordUserId,
        weekDays,
        hoursStart,
        hoursEnd,
        useVoiceChat,
      } = input;
      return await ctx.prisma.ad
        .create({
          data: {
            gameId,
            name,
            yearsPlaying,
            discordUserId,
            weekDays,
            hoursStart,
            hoursEnd,
            useVoiceChat,
          },
        })
        .catch((err) => {
          throw new TRPCError({ code: "BAD_REQUEST", message: err.message });
        });
    }),
});

export type AdsRouter = typeof adsRouter;
