import type { NextApiRequest, NextApiResponse } from "next";
import ytcm from '@freetube/yt-comment-scraper'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;
  if (id) {
    ytcm.getComments({videoId: id }).then((data) =>{
        console.log(data);
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(400).json({ error: err.message });
    })
   
  } else {
    res.status(400).json({ error: "No query provided" });
  }
}
