import type { NextApiRequest, NextApiResponse } from "next";
import google from "googlethis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { q, lang } = req.query;
  try {
    if (q) {
      let langu = "en";
      if (lang) langu = lang.toString();
      const options = {
        page: 0,
        safe: true,
        additional_params: {
          // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
          hl: langu,
          // as_filetype: 'mp4',
        },
      };
      const response = await google.image(q.toString(), options);
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "No query provided" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
