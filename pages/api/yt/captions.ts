import type { NextApiRequest, NextApiResponse } from "next";
import { getSubtitles } from "youtube-captions-scraper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.query;
  if (id) {
    getSubtitles({
      videoID: id,
      lang: "en",
    })
      .then((captions) => {
        res.status(200).json(captions);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } else {
    res.status(400).json({ error: "No query provided" });
  }
}
