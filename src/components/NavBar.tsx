import { signIn } from "next-auth/react";
import Link from "next/link";
import { SignIn } from "phosphor-react";
import Logo from "../assets/Logo.svg";

const NavBar = () => {
  return (
    <header className="navbar bg-accent backdrop-blur-sm bg-opacity-60 fixed">
      <nav className="flex w-full px-4 py-2">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <button
          className="btn btn-primary ml-auto gap-1"
          onClick={() => {
            signIn("discord");
          }}
        >
          Fazer login
          <SignIn size={20} />
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
