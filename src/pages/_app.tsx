// src/pages/_app.tsx
import "../styles/globals.css";
import { trpc } from "../utils/trpc";
import Image from "next/future/image";
import Fundo from "../assets/Fundo.jpg";
import NavBar from "../components/NavBar";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import type { Session } from "next-auth";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="flex flex-col">
        <NavBar />
        <Image
          priority
          quality={100}
          src={Fundo}
          fill={true}
          alt="fundo"
          className="absolute -z-10"
        />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
