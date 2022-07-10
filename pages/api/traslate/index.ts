import type { NextApiRequest, NextApiResponse } from "next";
const { translate } = require("free-translate");

const wordsLength = 100000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { text, to, lang } = req.query;
  try {
    if (text && to && text.length < wordsLength) {
      let langu = "en";
      if (lang) langu = lang.toString();
      const response = await translate(text.toString(), { to: langu });
      res.status(200).json(response);
    } else {
      if (text.length > wordsLength)
        res.status(400).json({
          error: "The lenght must by less than " + wordsLength + " characters",
        });
      else res.status(400).json({ error: "Invalid params" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
