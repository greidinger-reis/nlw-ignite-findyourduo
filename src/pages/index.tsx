import { createContextInner } from "../server/trpc/context";
import { gamesRouter } from "../server/trpc/router/games";
import { createProxySSGHelpers } from "@trpc/react/ssg";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import CreateAdCard from "../components/home/CreateAdCard";
import GamesBanner from "../components/home/GamesBanner";
import { AllGamesQueryOutput } from "../types/games";

const Home = ({ games }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>NextLevelWeek FindYourDuo</title>
        <meta name="description" content="Find your duo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full flex flex-col gap-16 items-center h-screen sm:h-[calc(100vh-100px)] justify-center">
        <h1 className="text-6xl font-extrabold text-white text-center">
          Seu{" "}
          <span className="tracking-tight text-transparent bg-clip-text gradient">
            duo
          </span>{" "}
          está aqui.
        </h1>
        <GamesBanner games={games} />
        <CreateAdCard />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  games: AllGamesQueryOutput;
}> = async () => {
  const ssg = createProxySSGHelpers({
    router: gamesRouter,
    ctx: await createContextInner({ session: null }),
  });

  const games = await ssg.getAllGames.fetch();

  return {
    props: {
      games,
    },
    revalidate: 60,
  };
};

export default Home;
