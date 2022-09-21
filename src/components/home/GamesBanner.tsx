import Image from "next/future/image";
import Link from "next/link";
import { useRef } from "react";
import { AllGamesQueryOutput } from "../../types/games";
import { CaretLeft, CaretRight } from "phosphor-react";

const GameCard = ({
  slug,
  bannerUrl,
  gameTitle,
  adsCount,
}: {
  slug: string;
  bannerUrl: string;
  gameTitle: string;
  adsCount: number;
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
              {adsCount} {adsCount === 1 ? "anúncio" : "anúncios"}
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
    <div className="flex gap-4">
      <button
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
        className="carousel carousel-center space-x-4 max-w-7xl rounded-box"
      >
        {games?.map((game) => (
          <GameCard
            key={game.id}
            gameTitle={game.title}
            slug={game.slug}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        ))}
      </ul>
      <button
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
