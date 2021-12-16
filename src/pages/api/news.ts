import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const url = "https://free-news.p.rapidapi.com/v1/search";

const headers = {
  "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
  "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
};

export default async function news(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { q, lang, page, from, to, topics, sources } = req.query;

    const baseParams = { q: q ? q : "news", lang, page, from, to };

    let params = {};
    if (topics && sources) {
      params = { ...baseParams, topics, sources };
    } else if (topics) {
      params = { ...baseParams, topics };
    } else if (sources) {
      params = { ...baseParams, sources };
    } else {
      params = { ...baseParams };
    }
    console.log(params);

    const { data } = await axios.get(url, { params, headers });

    data.params = params;
    data.headers = headers;

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
