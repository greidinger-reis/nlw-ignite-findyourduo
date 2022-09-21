import type { WeekDays } from "@prisma/client";
import { weekDaysAbbr } from "../../types/weekdays";
import {
  CalendarCheck,
  Clock,
  GameController,
  Microphone,
  MicrophoneSlash,
} from "phosphor-react";
import { Ad } from "../../types/ads";
import classNames from "classnames";

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
    <span className="absolute top-1 right-1 rounded-full bg-neutral font-white w-fit p-2">
      {useVoiceChat ? <Microphone size={24} /> : <MicrophoneSlash size={24} />}
    </span>
  );
};

const AdCard = ({ ad }: { ad: Ad }) => {
  return (
    <li className="card hover:scale-105 transition-all duration-300">
      <div className="bg-accent card-body relative">
        <h5 className="card-title">{ad.name}</h5>
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
        <VoiceIcon useVoiceChat={ad.useVoiceChat} />
      </div>
    </li>
  );
};

export default AdCard;
