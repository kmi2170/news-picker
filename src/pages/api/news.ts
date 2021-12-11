import { NextApiRequest, NextApiResponse } from "next";
import { fetchNews } from "../../api/lib/fetchNews";
import { QueryType } from "../../api/type_settngs";

export default async function news(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { q, lang } = req.query;

    const data = await fetchNews({ q, lang } as QueryType);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}
