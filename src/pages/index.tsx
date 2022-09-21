import { createContextInner } from "../server/trpc/context";
import { gamesRouter } from "../server/trpc/router/games";
import { createProxySSGHelpers } from "@trpc/react/ssg";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Logo from "../assets/Logo.svg";
import CreateAdCard from "../components/home/CreateAdCard";
import GamesBanner from "../components/home/GamesBanner";
import { AllGamesQueryOutput } from "../types/games";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home = ({ games }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>NextLevelWeek FindYourDuo</title>
        <meta name="description" content="Find your duo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full w-full flex flex-col gap-16 items-center">
        <Logo className="mt-16" />
        <h1 className="text-6xl font-extrabold text-white">
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
    ctx: await createContextInner({}),
  });

  const games = await ssg.getAllGames.fetch();

  return {
    props: {
      games,
    },
  };
};

export default Home;
