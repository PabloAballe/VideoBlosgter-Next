
import type { NextApiRequest, NextApiResponse } from "next";
import * as ytubes from "ytubes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { q, max, lang } = req.query;
  const body = req.body;
  if (q) {
    let maxRes = 10;
    let langu = "en";

    if (lang) langu = lang as string;

    if (max)
      // convert to number
      maxRes = Number(maxRes);
    const videos = await ytubes.getChannel(q as string, {
      max: maxRes,
      language: langu,
    });
    res.status(200).json(videos);
  } else {
    res.status(400).json({ error: "No query provided" });
  }
}
