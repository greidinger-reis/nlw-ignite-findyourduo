import { authedProcedure } from "./../trpc";
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
        select: {
          id: true,
          name: true,
          gameSlug: true,
          weekDays: true,
          hoursStart: true,
          hoursEnd: true,
          useVoiceChat: true,
          yearsPlaying: true,
          User: {
            select: {
              name: true,
              image: true,
              discriminator: true,
            },
          },
          Game: {
            select: {
              title: true,
              slug: true,
              bannerUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  createAd: authedProcedure
    .input(
      z.object({
        gameSlug: z.string(),
        name: z.string().min(1),
        yearsPlaying: z.number(),
        weekDays: z.array(z.nativeEnum(WeekDays)),
        hoursStart: z.string(),
        hoursEnd: z.string(),
        useVoiceChat: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const {
        gameSlug,
        name,
        yearsPlaying,
        weekDays,
        hoursStart,
        hoursEnd,
        useVoiceChat,
      } = input;
      return await ctx.prisma.ad
        .create({
          data: {
            gameSlug,
            name,
            yearsPlaying,
            weekDays,
            hoursStart,
            hoursEnd,
            useVoiceChat,
            userId,
          },
        })
        .catch((err) => {
          throw new TRPCError({ code: "BAD_REQUEST", message: err.message });
        });
    }),
});

export type AdsRouter = typeof adsRouter;
