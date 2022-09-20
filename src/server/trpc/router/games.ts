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
});

export type GamesRouter = typeof gamesRouter;
