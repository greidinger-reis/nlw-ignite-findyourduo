import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="pt-BR" data-theme="mytheme" className="bg-[#131215]">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
