import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const url = 'https://free-news.p.rapidapi.com/v1/search';

const headers = {
  'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
  'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
};

export default async function news(req: NextApiRequest, res: NextApiResponse) {
  const { q, lang, page, from, to, topic, sources } = req.query;

  const baseParams = { q: q ? q : 'news', lang, page, from, to };

  let params = {};
  if (topic && sources) {
    params = { ...baseParams, topic, sources };
  } else if (topic) {
    params = { ...baseParams, topic };
  } else if (sources) {
    params = { ...baseParams, sources };
  } else {
    params = { ...baseParams };
  }

  try {
    const { data } = await axios.get(url, { params, headers });

    res.status(200).json(data);
  } catch (error) {
    // const data = { headers, params, error };
    console.log(error);
    res.status(error.response.status).json(error);
  }
}
