import type { NextApiRequest, NextApiResponse } from "next";
import { playlistInfo } from "youtube-ext";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.query;
  if (id) {
    try {
      const playList = await playlistInfo(
        `https://www.youtube.com/playlist?list=${id}`
      );
      res.status(200).json(playList);
    } catch (error) {
        error.message ="Playlist not found";
        res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "No query provided" });
  }
}
