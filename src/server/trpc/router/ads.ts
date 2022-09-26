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

  getUserAds: authedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      return await ctx.prisma.ad.findMany({
        where: {
          userId,
        },
        include: {
          Game: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  deleteAd: authedProcedure
    .input(
      z.object({
        adId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { adId } = input;
      return await ctx.prisma.ad.delete({
        where: {
          id: adId,
        },
      });
    }),

  updateAd: authedProcedure
    .input(
      z.object({
        adId: z.string(),
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
      const {
        adId,
        name,
        gameSlug,
        yearsPlaying,
        weekDays,
        hoursStart,
        hoursEnd,
        useVoiceChat,
      } = input;
      const { id: userId } = ctx.session.user;
      return await ctx.prisma.ad.update({
        where: {
          id: adId,
        },
        data: {
          name,
          gameSlug,
          yearsPlaying,
          weekDays,
          hoursStart,
          hoursEnd,
          useVoiceChat,
          userId,
        },
      });
    }),
});

export type AdsRouter = typeof adsRouter;
