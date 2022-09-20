import { GameController, MagnifyingGlassPlus } from "phosphor-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { AdMutationInput } from "../types/ads";
import { trpc } from "../utils/trpc";
import SwapWeekDays from "./SwapWeekDays";
import { weekDays } from "@prisma/client";

const weekDaysAbbr = [
  { letter: "D", name: weekDays.DOMINGO },
  { letter: "S", name: weekDays.SEGUNDA },
  { letter: "T", name: weekDays.TERCA },
  { letter: "Q", name: weekDays.QUARTA },
  { letter: "Q", name: weekDays.QUINTA },
  { letter: "S", name: weekDays.SEXTA },
  { letter: "S", name: weekDays.SABADO },
];

const CreateAdModal = () => {
  const { data: game } = trpc.games.getAllGames.useQuery();
  const { mutate: createAd } = trpc.ads.createAd.useMutation({
    onError: (err) => console.error(err),
  }); //TODO: revalidate the cache and redirect to the game page
  const { register, handleSubmit } = useForm<AdMutationInput>();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (data: AdMutationInput) => {
    createAd(data);
  };

  return (
    <>
      <label
        htmlFor="modal-criar-anuncio"
        className="text-white font-medium text-base tracking-wide flex gap-2 transition-all btn btn-primary"
      >
        <MagnifyingGlassPlus size={20} className="mt-[1px]" />
        Publicar anúncio
      </label>
      <input
        type="checkbox"
        id="modal-criar-anuncio"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle bg-black bg-opacity-60">
        <div className="modal-box bg-base-100 flex flex-col">
          <strong className="font-black tracking-tight text-[32px] leading-relaxed text-white mb-8">
            Publique um anúncio
          </strong>
          <form ref={formRef} className="flex flex-col gap-4">
            <label
              htmlFor="gameId"
              className="flex flex-col text-white font-semibold"
            >
              Qual o game?
              <select
                {...(register("gameId"), { required: true })}
                className="select bg-neutral text-zinc-500 font-normal text-base rounded w-full"
              >
                <option disabled selected={true}>
                  Selecione o game que deseja jogar
                </option>
                {game?.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                ))}
              </select>
            </label>
            <label
              htmlFor="name"
              className="flex flex-col text-white font-semibold"
            >
              Seu nome (ou nickname)
              <input
                className="font-normal input bg-neutral rounded text-zinc-500 placeholder:text-zinc-500"
                placeholder="Como te chamam dentro do game?"
                type="text"
                {...(register("name"), { required: true })}
              />
            </label>
            <div className="flex gap-2 justify-between">
              <div>
                <label
                  htmlFor="yearsPlaying"
                  className="flex flex-col text-white font-semibold"
                >
                  Joga há quantos anos?
                </label>
                <input
                  className="input bg-neutral rounded text-zinc-500 placeholder:text-zinc-500"
                  placeholder="Tudo bem ser ZERO"
                  type="number"
                  {...register("yearsPlaying", {
                    valueAsNumber: true,
                    required: true,
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="discord"
                  className="flex flex-col text-white font-semibold"
                >
                  Qual seu discord?
                </label>
                <input
                  className="input bg-neutral rounded text-zinc-500 placeholder:text-zinc-500"
                  placeholder="Usuário + Tag discord"
                  type="text"
                  {...(register("discord"), { required: true })}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="dias-semana" className="text-white font-semibold">
                Quando costuma jogar?
              </label>
              <div className="flex gap-1" id="dias-semana">
                {weekDaysAbbr.map((day) => (
                  <label key={day.name} className="swap">
                    <input
                      type="checkbox"
                      value={day.name}
                      {...register("weekDays")}
                    />
                    <SwapWeekDays text={day.letter} />
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col" id="horario-dia">
              <label className="font-semibold text-white" htmlFor="horario-dia">
                Qual horário do dia?
              </label>
              <div className="flex gap-2">
                <input
                  className="before:content-['De'] before:mr-1 input bg-neutral rounded text-zinc-500 placeholder:text-zinc-500"
                  type="time"
                  {...(register("hoursStart"), { required: true })}
                />
                <input
                  className="before:content-['Até'] before:mr-1 input bg-neutral rounded text-zinc-500 placeholder:text-zinc-500"
                  type="time"
                  {...(register("hoursEnd"), { required: true })}
                />
              </div>
            </div>
            <label className="flex flex-row-reverse gap-2 justify-end font-semibold text-white cursor-pointer ">
              Costumo me conectar ao chat de voz
              <input
                className="checkbox rounded bg-neutral checkbox-primary border-0"
                type="checkbox"
                {...register("useVoiceChat")}
              />
            </label>
            <div className="modal-action flex justify-end gap-2">
              <label
                onClick={() => formRef.current?.reset()}
                htmlFor="modal-criar-anuncio"
                className="btn btn-secondary text-white tracking-wider"
              >
                Cancelar
              </label>
              <label
                onClick={handleSubmit(onSubmit)}
                htmlFor="modal-criar-anuncio"
                className="btn btn-primary gap-2 text-white tracking-wider"
              >
                <GameController size={24} className="mb-[1px]" />
                Encontrar duo
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAdModal;
