import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
import { NewsDataType } from "../../api/types";

const url = "https://v3-api.newscatcherapi.com/api/search";
const headers = {
  "x-api-token": process.env.NEXT_API_KEY,
  // 'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
};

export default async function news(req: NextApiRequest, res: NextApiResponse) {
  // const { q, lang, page, from, to, topic, sources } = req.query;
  // // const baseParams = { q: q ? q : "bitcoin", lang, page, from, to };
  // const baseParams = {
  //   q: "Bitcoin",
  //   lang: "en",
  //   sort_by: "relevancy",
  //   page: "1",
  // };

  // let params = {};
  // if (topic && sources) {
  //   params = { ...baseParams, topic, sources };
  // } else if (topic) {
  //   params = { ...baseParams, topic };
  // } else if (sources) {
  //   params = { ...baseParams, sources };
  // } else {
  //   params = { ...baseParams };
  // }

  const options = {
    method: "GET",
    url: "https://v3-api.newscatcherapi.com/api/search?",
    params: { q: "Bitcoin", lang: "en", sort_by: "relevancy", page: "1" },
    headers: {
      "x-api-token": process.env.NEXT_API_KEY,
    },
  };
  console.log(options);

  try {
    // const { data } = await axios.get<NewsDataType>(url, { params, headers });
    const { data } = await axios.request(options);
    console.log(">>>>>>>>>", data);
    res.status(200).json(data);
  } catch (error) {
    console.error((error as AxiosError).message);
  }
}
