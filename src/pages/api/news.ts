import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { NewsDataType } from '../../api/type_settngs';

const url = 'https://free-news.p.rapidapi.com/v1/search';

const headers = {
  'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
  'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
};

export default async function news(req: NextApiRequest, res: NextApiResponse) {
  const { q, lang, page, from, to, topics, sources } = req.query;

  const baseParams = { q: q ? q : 'news', lang, page, from, to };

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

  try {
    const { data } = await axios.get<NewsDataType>(url, { params, headers });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    // res.status(error.response.status).json(error);
  }
}
