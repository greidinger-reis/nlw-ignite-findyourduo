// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { trpc } from "../utils/trpc";
import Image from "next/future/image";
import Fundo from "../assets/Fundo.jpg";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="flex">
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
  );
};

export default trpc.withTRPC(MyApp);
