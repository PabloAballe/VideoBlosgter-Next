import * as yt from "youtube-search-without-api-key";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;
  if (id) {
    const videos = await yt.search(id as string);
    const video = videos.filter((video) => video.id.videoId === id);
    res.status(200).json(video);
  } else {
    res.status(400).json({ error: "No query provided" });
  }
}
