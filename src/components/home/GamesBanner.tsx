import Image from "next/future/image";
import Link from "next/link";
import { useRef } from "react";
import { AllGamesQueryOutput } from "../../types/games";
import { CaretLeft, CaretRight } from "phosphor-react";

const GameCard = ({
  slug,
  bannerUrl,
  gameTitle,
  adCount,
}: {
  slug: string;
  bannerUrl: string;
  gameTitle: string;
  adCount: number;
}) => {
  return (
    <li className="card w-48 h-64 overflow-hidden relative carousel-item">
      <Link href={`/game/${slug}`}>
        <a className="card-body">
          <Image
            src={bannerUrl}
            alt={`${gameTitle} banner image.`}
            fill={true}
          />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="card-title font-bold text-white">
              {gameTitle}
            </strong>
            <span className="text-zinc-300 block text-sm">
              {adCount} {adCount === 1 ? "anúncio" : "anúncios"}
            </span>
          </div>
        </a>
      </Link>
    </li>
  );
};

const GamesBanner = ({ games }: { games: AllGamesQueryOutput | undefined }) => {
  const carouselRef = useRef<HTMLUListElement>(null);
  return (
    <div className="flex sm:gap-4 max-w-[1380px] sm:w-10/12 w-full px-2 sm:px-0">
      <button
        className="hidden sm:block"
        onClick={() => {
          if (!carouselRef.current) {
            return;
          }
          carouselRef.current.scrollLeft -= 200;
        }}
      >
        <CaretLeft size={32} />
      </button>
      <ul
        ref={carouselRef}
        className="carousel carousel-center space-x-4 rounded-box"
      >
        {games?.map((game) => (
          <GameCard
            key={game.id}
            gameTitle={game.title}
            slug={game.slug}
            bannerUrl={game.bannerUrl}
            adCount={game._count.ads}
          />
        ))}
      </ul>
      <button
        className="hidden sm:block"
        onClick={() => {
          if (!carouselRef.current) {
            return;
          }
          carouselRef.current.scrollLeft += 200;
        }}
      >
        <CaretRight size={32} />
      </button>
    </div>
  );
};

export default GamesBanner;
