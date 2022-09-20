import CreateAdModal from "./CreateAdModal";

const CreateAdCard = () => {
  return (
    <div className="rounded-box gradient h-28 w-3/4 max-w-7xl">
      <div className="mt-[5px] flex rounded-box px-8 py-6 bg-[#2A2634] items-center">
        <div className="flex flex-col gap-1">
          <strong className="text-2xl tracking-tight font-black text-white">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 tracking-wider">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <div className="ml-auto">
          <CreateAdModal />
        </div>
      </div>
    </div>
  );
};

export default CreateAdCard;
