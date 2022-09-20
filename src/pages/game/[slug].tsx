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

const GamePage = ({ slug }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: ads, isLoading } = trpc.ads.getAdsByGameSlug.useQuery({ slug });
  return (
    <div>
      <h1>Game: {slug}</h1>
      <ul>
        {isLoading
          ? "Loading..."
          : ads?.map((ad) => (
              <li key={ad.id}>
                <span>{ad.name}</span>
                <span>{ad.weekDays}</span>
                <span>{ad.discord}</span>
              </li>
            ))}
      </ul>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ctx = await createContextInner({});
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
    ctx: await createContextInner({}),
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