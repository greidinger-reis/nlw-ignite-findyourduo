import { GameController, MagnifyingGlassPlus, Pencil } from "phosphor-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { CreateAdInput, UpdateAdInput } from "../../types/ads";
import { trpc } from "../../utils/trpc";
import SwapWeekDays from "./SwapWeekDays";
import { weekDaysAbbr } from "../../constants/weekdays";
import { useRouter } from "next/router";
import classNames from "classnames";
import Spinner from "../Spinner";
import { useSession } from "next-auth/react";
import LoginModal from "./LoginModal";

export const AuthedCreateAdButton = ({
  adToUpdate,
}: {
  adToUpdate?: UpdateAdInput;
}) => {
  const router = useRouter();
  const [creatingAd, setCreatingAd] = useState(false);
  const { data: game } = trpc.games.getAllGames.useQuery();
  const { mutate: createAd } = trpc.ads.createAd.useMutation({
    onError: (err) => console.error(err),
    onSuccess: async (data) => {
      router.push(`/game/${data.gameSlug}`);
    },
  });
  const { mutate: updateAd } = trpc.ads.updateAd.useMutation({
    onError: (err) => console.error(err),
    onSuccess: async (data) => {
      router.push(`/game/${data.gameSlug}`);
    },
  });
  const { register: registerCreateAd, handleSubmit: handleSubmitCreateAd } =
    useForm<CreateAdInput>();
  const {
    register: registerUpdateAd,
    handleSubmit: handleSubmitUpdateAd,
    setValue,
  } = useForm<UpdateAdInput>();

  const formRef = useRef<HTMLFormElement>(null);

  const handleCreateAd = (data: CreateAdInput) => {
    setCreatingAd(true);
    createAd(data);
  };

  const handleUpdateAd = (data: UpdateAdInput) => {
    setCreatingAd(true);
    updateAd(data);
  };

  adToUpdate && setValue("adId", adToUpdate.adId);

  return (
    <>
      <label
        htmlFor={
          adToUpdate
            ? `modal-editar-anuncio-${adToUpdate.adId}`
            : "modal-criar-anuncio"
        }
        className={classNames(
          "text-white font-medium text-base tracking-wide flex gap-2 transition-all btn",
          {
            "btn-sm btn-info": adToUpdate,
            "btn-primary": !adToUpdate,
          }
        )}
      >
        {adToUpdate ? (
          <Pencil size={20} />
        ) : (
          <>
            <MagnifyingGlassPlus size={20} className="mt-[1px]" />{" "}
            <span>Publicar anúncio</span>
          </>
        )}
      </label>
      <input
        type="checkbox"
        id={
          adToUpdate
            ? `modal-editar-anuncio-${adToUpdate.adId}`
            : "modal-criar-anuncio"
        }
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle bg-black bg-opacity-60">
        <div className="modal-box bg-base-100 flex flex-col rounded-none sm:rounded-box">
          <strong className="text-center font-black tracking-tight text-[32px] leading-relaxed text-white mb-8">
            Publique um anúncio
          </strong>
          <form ref={formRef} className="flex flex-col gap-4">
            <label
              htmlFor="gameId"
              className="flex flex-col text-white font-semibold"
            >
              Qual o game?
              <select
                className="select bg-neutral text-zinc-500 font-normal text-base rounded w-full"
                {...(adToUpdate
                  ? { ...registerUpdateAd("gameSlug", { required: true }) }
                  : { ...registerCreateAd("gameSlug", { required: true }) })}
              >
                <option disabled selected={!adToUpdate}>
                  Selecione o game que deseja jogar
                </option>
                {game?.map((game) => (
                  <option
                    selected={adToUpdate?.gameSlug === game.slug}
                    key={game.slug}
                    value={game.slug}
                  >
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
                defaultValue={adToUpdate?.name}
                {...(adToUpdate
                  ? { ...registerUpdateAd("name", { required: true }) }
                  : { ...registerCreateAd("name", { required: true }) })}
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
                  defaultValue={adToUpdate?.yearsPlaying}
                  {...(adToUpdate
                    ? {
                        ...registerUpdateAd("yearsPlaying", {
                          required: true,
                          valueAsNumber: true,
                        }),
                      }
                    : {
                        ...registerCreateAd("yearsPlaying", {
                          required: true,
                          valueAsNumber: true,
                        }),
                      })}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="dias-semana" className="text-white font-semibold">
                Quando costuma jogar?
              </label>
              <div className="flex flex-wrap gap-1" id="dias-semana">
                {weekDaysAbbr.map((day) => (
                  <label key={day.name} className="swap">
                    <input
                      type="checkbox"
                      value={day.name}
                      defaultChecked={adToUpdate?.weekDays.includes(day.name)}
                      {...(adToUpdate
                        ? { ...registerUpdateAd("weekDays") }
                        : { ...registerCreateAd("weekDays") })}
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
                  defaultValue={adToUpdate?.hoursStart}
                  {...(adToUpdate
                    ? { ...registerUpdateAd("hoursStart", { required: true }) }
                    : {
                        ...registerCreateAd("hoursStart", { required: true }),
                      })}
                />
                <input
                  className="before:content-['Até'] before:mr-1 input bg-neutral rounded text-zinc-500 placeholder:text-zinc-500"
                  type="time"
                  defaultValue={adToUpdate?.hoursEnd}
                  {...(adToUpdate
                    ? { ...registerUpdateAd("hoursEnd", { required: true }) }
                    : { ...registerCreateAd("hoursEnd", { required: true }) })}
                />
              </div>
            </div>
            <label className="flex flex-row-reverse gap-2 justify-end font-semibold text-white cursor-pointer ">
              Costumo me conectar ao chat de voz
              <input
                className="checkbox rounded bg-neutral checkbox-primary border-0"
                type="checkbox"
                defaultChecked={adToUpdate?.useVoiceChat}
                {...(adToUpdate
                  ? { ...registerUpdateAd("useVoiceChat", { required: true }) }
                  : {
                      ...registerCreateAd("useVoiceChat", { required: true }),
                    })}
              />
            </label>
            <div className="modal-action flex justify-end gap-2">
              <label
                onClick={() => formRef.current?.reset()}
                htmlFor={
                  adToUpdate
                    ? `modal-editar-anuncio-${adToUpdate.adId}`
                    : "modal-criar-anuncio"
                }
                className="btn btn-secondary text-white tracking-wider"
              >
                Cancelar
              </label>
              <label
                onClick={
                  adToUpdate
                    ? handleSubmitUpdateAd(handleUpdateAd)
                    : handleSubmitCreateAd(handleCreateAd)
                }
                htmlFor={
                  adToUpdate
                    ? `modal-editar-anuncio-${adToUpdate.adId}`
                    : "modal-criar-anuncio"
                }
                className={classNames(
                  "btn btn-primary text-white tracking-wider",
                  {
                    "btn-disabled": creatingAd,
                  }
                )}
              >
                {creatingAd ? (
                  <span className="flex gap-2 items-center">
                    Publicando <Spinner size={24} />
                  </span>
                ) : (
                  <span className="flex gap-2 items-center">
                    Publicar anúncio{" "}
                    <GameController size={24} className="mb-[1px]" />
                  </span>
                )}
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const UnathedCreateAdButton = () => {
  return <LoginModal />;
};

const CreateAdModal = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading)
    return (
      <button className="text-white font-medium text-base tracking-wide flex gap-2 transition-all btn btn-primary opacity-60 animate-pulse">
        <MagnifyingGlassPlus size={20} className="mt-[1px]" /> Publicar anúncio
      </button>
    );

  if (!session) return <UnathedCreateAdButton />;

  return <AuthedCreateAdButton />;
};

export default CreateAdModal;
