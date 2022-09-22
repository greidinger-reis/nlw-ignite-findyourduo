import type { WeekDays } from "@prisma/client";
import { weekDaysAbbr } from "../../constants/weekdays";
import {
  CalendarCheck,
  Clock,
  GameController,
  Microphone,
  MicrophoneSlash,
} from "phosphor-react";
import { Ad } from "../../types/ads";
import classNames from "classnames";
import Image from "next/future/image";
import Tooltip from "../Tooltip";

const PlayerWeekDays = ({ weekDays }: { weekDays: WeekDays[] }) => {
  return (
    <div className="flex gap-1">
      {weekDaysAbbr.map((day) => (
        <span
          key={day.name}
          className={classNames("rounded bg-neutral py-1 px-3 font-semibold", {
            "bg-primary": weekDays.includes(day.name),
          })}
        >
          {day.letter}
        </span>
      ))}
    </div>
  );
};

const VoiceIcon = ({ useVoiceChat }: { useVoiceChat: boolean }) => {
  return (
    <span className="rounded-full bg-neutral font-white w-fit p-2">
      {useVoiceChat ? <Microphone size={24} /> : <MicrophoneSlash size={24} />}
    </span>
  );
};

const AdCard = ({ ad }: { ad: Ad }) => {
  return (
    <li className="card hover:scale-105 transition-all duration-300">
      <div className="bg-accent card-body gap-2 relative">
        {ad.User?.image ? (
          <div className="flex gap-2 items-center mb-5">
            <Image
              className="rounded-md"
              alt="Imagem usuário autor do anúncio"
              src={ad.User?.image}
              width={64}
              height={64}
            />
            <h5 className="card-title">{ad.name}</h5>
          </div>
        ) : (
          <h5 className="card-title mb-4">{ad.name}</h5>
        )}
        <div className="flex gap-1 items-center">
          <CalendarCheck size={24} />
          <PlayerWeekDays weekDays={ad.weekDays} />
        </div>
        <div className="flex gap-1 items-center">
          <Clock size={24} />
          <span className="bg-neutral px-2 py-1 rounded font-semibold">
            {ad.hoursStart}
          </span>
          <span className="bg-neutral px-2 py-1 rounded font-semibold">
            {ad.hoursEnd}
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <GameController size={24} />
          <span className="gap-1 font-semibold">{ad.yearsPlaying} anos</span>
        </div>
        <div className="absolute top-1 right-1">
          <Tooltip
            message={`Este jogador ${
              ad.useVoiceChat ? "utiliza" : "não utiliza"
            } chat de voz.`}
          >
            <VoiceIcon useVoiceChat={ad.useVoiceChat} />
          </Tooltip>
        </div>
        <button
          onClick={() => console.log(ad.User)}
          className="btn btn-primary mt-4"
        >
          Vamos jogar!
        </button>
      </div>
    </li>
  );
};

export default AdCard;
