import * as yt from "youtube-search-without-api-key";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(400).json({ error: "This end point is not available" });
}
