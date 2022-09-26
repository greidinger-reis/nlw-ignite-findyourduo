import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/future/image";
import Link from "next/link";
import { CaretDown, DiscordLogo, SignIn } from "phosphor-react";
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
                <div className="flex items-center">
                  <strong className="mr-2">
                    {session.user?.name}#{session.user.disciminator}
                  </strong>
                  <Image
                    src={session.user?.image}
                    alt="Avatar do usúario"
                    width={48}
                    height={48}
                    className="rounded-full cursor-pointer"
                    tabIndex={0}
                  />
                  <CaretDown
                    tabIndex={0}
                    size={20}
                    className="ml-1 cursor-pointer"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-4 gap-1 shadow bg-base-100 rounded-box w-fit"
                >
                  <Link href={`/my-ads/${session.user.id}`}>
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
            <DiscordLogo size={20} className="mt-[1px] mr-1" /> Fazer login
            <SignIn size={20} />
          </button>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
