import type { NextApiRequest, NextApiResponse } from "next";
import { channelInfo } from "youtube-ext";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.query;
  if (id) {
    try {
      const channel = await channelInfo(
        `https://www.youtube.com/channel/${id}`
      );
      res.status(200).json(channel);
    } catch (err) {
      err.message ="Channel not found";
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(400).json({ error: "No query provided" });
  }
}
