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

export const revalidatePages = async (slug?: string[]) => {
  const basePath = ["/"];

  if (slug) {
    const pathsToRevalidate = slug.map((slug) => `/game/${slug}`);
    const path = basePath.concat(pathsToRevalidate);
    await revalidate(env.NEXT_PUBLIC_REVALIDATE_KEY, path);
    return;
  }

  await revalidate(env.NEXT_PUBLIC_REVALIDATE_KEY, basePath);
};
