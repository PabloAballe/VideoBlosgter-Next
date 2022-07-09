import type { NextApiRequest, NextApiResponse } from "next";
const ytrend = require("yt-trending-scraper");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { location, type } = req.query;

  let locate = "US";
  if (location) locate = location as string;
  let types = "default";
  if (type) types = type as string;

  ytrend
    .scrape_trending_page({ geoLocation: locate, page: types })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
