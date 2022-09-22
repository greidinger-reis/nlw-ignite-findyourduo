import { env } from "../env/client.mjs";

const revalidate = (secret: string, paths: string[]) => {
  return fetch("/api/revalidate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ secret, paths }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export const revalidatePages = (slug: string) => {
  const basePath = "/";
  const pathToRevalidate = `/game/${slug}`;
  const paths = [basePath, pathToRevalidate];

  return revalidate(env.NEXT_PUBLIC_REVALIDATE_KEY, paths);
};
