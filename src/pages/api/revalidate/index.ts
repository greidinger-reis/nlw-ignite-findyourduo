/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "../../../env/server.mjs";

const handler = async (req: any, res: any) => {
  if (req.body.secret !== env.NEXT_PUBLIC_REVALIDATE_KEY) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    const paths = req.body.paths as string[];
    const promises = [] as Promise<any>[];

    paths.map((path) => {
      promises.push(res.revalidate(path));
    });
    console.log("revalidating now:", paths);

    Promise.all(promises).then(() => {
      console.log("revalidated:", paths);
      return res.json({
        revalidated: true,
      });
    });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
};

export default handler;
