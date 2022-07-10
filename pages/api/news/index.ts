import type { NextApiRequest, NextApiResponse } from "next";
import google from "googlethis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { region, lang } = req.query;
  try {
    let langu = "en";
    let reg = "US";
    if (lang) langu = lang.toString();
    if (region) reg = region.toString();
    const response = await google.getTopNews(langu, reg);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
