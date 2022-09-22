import CreateAdModal from "./CreateAdModal";

const CreateAdCard = () => {
  return (
    <div className="sm:rounded-box gradient h-28 sm:w-3/4 sm:max-w-7xl w-full">
      <div className="mt-[5px] flex flex-col gap-4 sm:gap-0 sm:flex-row sm:rounded-box px-8 py-6 bg-accent items-center">
        <div className="flex flex-col gap-1">
          <strong className="text-2xl tracking-tight font-black text-white">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 tracking-wider">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <div className="sm:ml-auto w-full sm:w-fit">
          <CreateAdModal />
        </div>
      </div>
    </div>
  );
};

export default CreateAdCard;
