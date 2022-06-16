import * as yt from "youtube-search-without-api-key";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { q } = req.query;
  const body = req.body;
  if (q) {
    const videos = await yt.search(q as string);
    console.log(body)
    res.status(200).json(videos);
  } else {
    res.status(400).json({ error: "No query provided" });
  }
}
