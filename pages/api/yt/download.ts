import ytdl from "ytdl-core";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.query;
  if (id) {
    let info = await ytdl.getInfo(id);
    let audioFormats = ytdl.filterFormats(info.formats, "audioonly");
    let videoFormats = ytdl.filterFormats(info.formats, "video");
    res.status(200).json({
      info: info.videoDetails,
      video: videoFormats[0],
      audio: audioFormats[0],
    });
  } else {
    res.status(400).json({ error: "No query provided" });
  }
}
