import { NextApiRequest, NextApiResponse } from "next";
import { fetchNews } from "../../api/lib/fetchNews";

export default async function news(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { q, lang, page, from, to, topic, sources } = req.query;

    const data = await fetchNews(
      q as string,
      lang as string,
      page as string,
      from as string,
      to as string,
      topic as string,
      sources as string
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}
