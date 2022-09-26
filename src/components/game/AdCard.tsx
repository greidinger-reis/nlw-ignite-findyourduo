import { weekDaysAbbr } from "../../constants/weekdays";
import {
  CalendarCheck,
  Clock,
  GameController,
  Microphone,
  MicrophoneSlash,
  X,
} from "phosphor-react";
import { Ad } from "../../types/ads";
import classNames from "classnames";
import Image from "next/future/image";
import Tooltip from "../Tooltip";
import { useEffect, useState } from "react";
import { weekDaysAccented } from "../../utils/weekdays";
import type { WeekDays } from "@prisma/client";

export const PlayerWeekDays = ({ weekDays }: { weekDays: WeekDays[] }) => {
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

const LetsPlayModal = ({ ad }: { ad: Ad }) => {
  const [discordUserCopied, setDiscordUserCopied] = useState(false);
  const modalId = `ad-${ad.id}`;
  const discordUser = `${ad.User?.name}#${ad.User?.discriminator}`;

  useEffect(() => {
    if (discordUserCopied) {
      setTimeout(() => setDiscordUserCopied(false), 2000);
    }
  }, [discordUserCopied]);

  return (
    <>
      <label htmlFor={modalId} className="btn btn-primary mt-4">
        Vamos jogar!
      </label>
      <input className="modal-toggle" type="checkbox" id={modalId} />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col gap-2">
          <p className="flex gap-2 items-center">
            <strong className="card-title">{ad.name}</strong>
            <span className="text-gray-400">{discordUser}</span>
          </p>
          <p>
            <strong>Jogo nestes dias: </strong>
            <p className="flex gap-1 break-all">
              {ad.weekDays.map((day) => (
                <span key={day}>{weekDaysAccented[day]}</span>
              ))}
            </p>
          </p>
          <p>
            <strong>Horários disponíveis: </strong>
            <span>
              de {ad.hoursStart} até {ad.hoursEnd}
            </span>
          </p>
          <p>
            Joga {ad.Game?.title} há {ad.yearsPlaying} anos.
          </p>
          <label
            htmlFor={modalId}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <X size={16} />
          </label>
          <button
            onClick={() => {
              navigator.clipboard.writeText(discordUser);
              setDiscordUserCopied(true);
            }}
            className={classNames("btn btn-primary mt-2", {
              "btn-disabled bg-green-500 text-accent": discordUserCopied,
            })}
          >
            {discordUserCopied ? "Copiado!" : "Copiar usuário discord"}
          </button>
        </div>
      </div>
    </>
  );
};

const AdCard = ({ ad }: { ad: Ad }) => {
  return (
    <>
      <li className="card transition-all duration-300">
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
          <LetsPlayModal ad={ad} />
        </div>
      </li>
    </>
  );
};

export default AdCard;
