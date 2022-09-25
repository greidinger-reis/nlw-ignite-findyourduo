import { z } from "zod";
import { t } from "../trpc";

export const gamesRouter = t.router({
  getAllGames: t.procedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany({
      orderBy: {
        title: "asc",
      },
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });
  }),
  getGameBySlug: t.procedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.game.findUniqueOrThrow({
        where: {
          slug: input.slug,
        },
        include: {
          _count: {
            select: {
              ads: true,
            },
          },
        },
      });
    }),
});

export type GamesRouter = typeof gamesRouter;
