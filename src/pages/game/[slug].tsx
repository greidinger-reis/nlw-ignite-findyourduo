import { createContextInner } from "../../server/trpc/context";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { GetStaticProps } from "next";
import { createProxySSGHelpers } from "@trpc/react/ssg";
import superjson from "superjson";
import AdCard from "../../components/game/AdCard";
import CreateAdModal from "../../components/home/CreateAdModal";
import { trpc } from "../../utils/trpc";
import Spinner from "../../components/Spinner";
import { appRouter } from "../../server/trpc/router";
import Link from "next/link";
import { GameBySlugQueryOutput } from "../../types/games";

const GamePage = ({
  slug,
  game,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: ads, isLoading } = trpc.ads.getAdsByGameSlug.useQuery({ slug });

  return (
    <div className="container mx-auto">
      <div className="breadcrumbs py-4 w-fit mx-auto sm:mx-0">
        <ul>
          <li>
            <Link href="/">
              <a>Inicio</a>
            </Link>
          </li>
          <li>
            <Link href={`/game/${slug}`}>
              <a>{game.title}</a>
            </Link>
          </li>
        </ul>
      </div>
      <ul className="flex gap-4 flex-wrap justify-center py-4">
        {isLoading ? (
          <Spinner size={48} />
        ) : ads && ads.length > 0 ? (
          ads.map((ad) => <AdCard key={ad.id} ad={ad} />)
        ) : (
          <div className="flex flex-col gap-4 px-8">
            <h1 className="font-bold text-2xl text-center">
              Não há anúncios para este jogo no momento
            </h1>
            <CreateAdModal />
          </div>
        )}
      </ul>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ctx = await createContextInner({ session: null });
  const games = await ctx.prisma.game.findMany({
    select: {
      slug: true,
    },
  });
  return {
    paths: games.map((game) => ({ params: { slug: game.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  game: GameBySlugQueryOutput;
  slug: string;
}> = async (ctx: GetStaticPropsContext) => {
  const slug = ctx.params?.slug as string;
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  });

  const game = await ssg.games.getGameBySlug.fetch({ slug });

  return {
    props: {
      game,
      slug,
    },
  };
};

export default GamePage;
