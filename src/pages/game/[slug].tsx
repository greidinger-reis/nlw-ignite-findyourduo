import { createContextInner } from "../../server/trpc/context";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { GetStaticProps } from "next";
import { createProxySSGHelpers } from "@trpc/react/ssg";
import { adsRouter } from "../../server/trpc/router/ads";
import { DehydratedState } from "@tanstack/react-query";
import { trpc } from "../../utils/trpc";
import superjson from "superjson";
import AdCard from "../../components/game/AdCard";
import CreateAdModal from "../../components/home/CreateAdModal";
import Spinner from "../../components/Spinner";

const GamePage = ({ slug }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: ads, isLoading } = trpc.ads.getAdsByGameSlug.useQuery({ slug });
  return (
    <div className="container flex items-center justify-center mx-auto h-screen">
      <ul className="flex gap-4 flex-wrap justify-center">
        {isLoading ? (
          <Spinner />
        ) : ads && ads?.length > 0 ? (
          ads?.map((ad) => <AdCard key={ad.id} ad={ad} />)
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
  dehydratedState: DehydratedState;
  slug: string;
}> = async (ctx: GetStaticPropsContext) => {
  const slug = ctx.params?.slug as string;
  const ssg = createProxySSGHelpers({
    router: adsRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  });

  await ssg.getAdsByGameSlug.fetch({ slug });

  return {
    props: {
      dehydratedState: ssg.dehydrate(),
      slug,
    },
  };
};

export default GamePage;
