import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/future/image";
import Link from "next/link";
import { SignIn } from "phosphor-react";
import Logo from "../assets/Logo.svg";

const NavBar = () => {
  const { data: session, status } = useSession();

  return (
    <header className="navbar bg-accent backdrop-blur-sm bg-opacity-60">
      <nav className="flex w-full px-4 py-2">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        {session ? (
          <>
            {session.user?.image && (
              <div className="ml-auto dropdown dropdown-end">
                <Image
                  src={session.user?.image}
                  alt="Avatar do usúario"
                  width={48}
                  height={48}
                  className="rounded-full cursor-pointer"
                  tabIndex={0}
                />
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-4 gap-1 shadow bg-base-100 rounded-box w-fit"
                >
                  <li className="font-bold text-white">
                    {session.user.name}#{session.user.disciminator}
                  </li>
                  <Link href={`/my-ads`}>
                    <a className="hover:text-primary hover:underline">
                      Meus anúncios
                    </a>
                  </Link>
                  <li
                    className="cursor-pointer hover:text-primary hover:underline"
                    onClick={() => signOut()}
                  >
                    Sair
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : status === "loading" ? (
          <div className="ml-auto rounded-full h-12 w-12 animate-pulse bg-zinc-500" />
        ) : (
          <button
            className="btn btn-primary ml-auto gap-1 text-white"
            onClick={() => signIn("discord")}
          >
            Fazer login
            <SignIn size={20} />
          </button>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
