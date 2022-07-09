import type { NextApiRequest, NextApiResponse } from "next";
import youtubeSuggest from "youtube-suggest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { q, lang } = req.query;
  if (q) {
    let langu = "en";

    if (lang) langu = lang as string;
    youtubeSuggest(q as string, { locale: langu }).then(function (results) {
      res.status(200).json(results);
    });
  } else {
    res.status(400).json({ error: "No query provided" });
  }
}
