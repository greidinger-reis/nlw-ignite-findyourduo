import { signIn } from "next-auth/react";
import { DiscordLogo, MagnifyingGlassPlus, SignIn } from "phosphor-react";

const LoginModal = () => {
  return (
    <>
      <label
        htmlFor="modal-login"
        className="text-white font-medium text-base tracking-wide flex gap-2 transition-all btn btn-primary"
      >
        <MagnifyingGlassPlus size={20} className="mt-[1px]" />
        Publicar anúncio
      </label>
      <input type="checkbox" id="modal-login" className="modal-toggle" />
      <label
        htmlFor="modal-login"
        className="modal modal-bottom sm:modal-middle bg-black bg-opacity-60"
      >
        <label
          htmlFor=""
          className="modal-box relative bg-base-100 flex flex-col rounded-none sm:rounded-box"
        >
          <strong className="text-center font-black tracking-tight text-[32px] leading-relaxed text-white mb-8">
            Faça login para publicar um anúncio
          </strong>
          <button className="btn btn-primary" onClick={() => signIn("discord")}>
            <DiscordLogo size={20} className="mt-[1px] mr-1" /> Fazer Login{" "}
            <SignIn size={20} className="mt-[1px] ml-1" />
          </button>
        </label>
      </label>
    </>
  );
};

export default LoginModal;
