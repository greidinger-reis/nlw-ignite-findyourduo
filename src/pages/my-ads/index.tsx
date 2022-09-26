import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Trash } from "phosphor-react";
import CreateAdModal, {
  AuthedCreateAdButton,
} from "../../components/home/CreateAdModal";
import Spinner from "../../components/Spinner";
import { UpdateAdInput } from "../../types/ads";
import { trpc } from "../../utils/trpc";

const UserAdListPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const {
    data: userAds,
    isLoading,
    refetch: refreshAdlist,
  } = trpc.ads.getUserAds.useQuery({ userId });

  const { mutateAsync: deleteAd, status } = trpc.ads.deleteAd.useMutation();

  const handleDeleteAd = async (adId: string) => {
    await deleteAd({ adId });
    refreshAdlist();
  };

  return (
    <div className="container mx-auto">
      <div className="breadcrumbs py-4 w-fit mx-auto sm:mx-0">
        <ul>
          <li>
            <Link href="/">
              <a>Inicio</a>
            </Link>
          </li>
          <li>
            <Link href="/my-ads">
              <a>Meus anúncios</a>
            </Link>
          </li>
        </ul>
      </div>
      <h1 className="font-bold text-3xl text-center">Meus anúncios</h1>
      <div className="flex items-center justify-center h-full py-4 sm:py-8">
        {isLoading ? (
          <Spinner size={32} />
        ) : userAds && userAds.length > 0 ? (
          <ul className="flex flex-col gap-2 w-full">
            {userAds.map((ad) => {
              const adToUpdate: UpdateAdInput = {
                adId: ad.id,
                gameSlug: ad.gameSlug,
                name: ad.name,
                hoursEnd: ad.hoursEnd,
                hoursStart: ad.hoursStart,
                weekDays: ad.weekDays,
                useVoiceChat: ad.useVoiceChat,
                yearsPlaying: ad.yearsPlaying,
              };
              return (
                <li
                  className="flex items-center rounded bg-accent py-3 px-6"
                  key={ad.id}
                >
                  <div className="flex flex-col">
                    <div>
                      <strong>Jogo:</strong> {ad.Game?.title}
                    </div>
                    <div>
                      <strong>Nickname informado:</strong> {ad.name}
                    </div>
                    <div>
                      <strong>Data de criação do anúncio:</strong>{" "}
                      {ad.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-1 ml-auto">
                    <label htmlFor={ad.id} className="btn btn-sm btn-error">
                      <Trash size={20} />
                    </label>
                    <input
                      className="modal-toggle"
                      type="checkbox"
                      id={ad.id}
                    />
                    <div className="modal modal-bottom sm:modal-middle">
                      <div className="modal-box flex flex-col gap-2">
                        <strong>
                          Tem certeza que deseja excluir este anúncio?
                        </strong>
                        <div className="modal-action">
                          <label htmlFor={ad.id} className="btn btn-sm">
                            Não
                          </label>
                          <button
                            className={classNames("btn btn-sm btn-primary", {
                              "btn-disabled bg-primary": status === "loading",
                            })}
                            onClick={() => handleDeleteAd(ad.id)}
                          >
                            {status === "loading" ? (
                              <div className="flex gap-1 items-center">
                                Sim
                                <Spinner size={20} />
                              </div>
                            ) : (
                              "Sim"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <AuthedCreateAdButton adToUpdate={adToUpdate} />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div>
            <h2 className="text-2xl mb-4">Você ainda não possui anúncios.</h2>
            <CreateAdModal />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAdListPage;
