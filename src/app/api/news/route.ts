import axios, { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";

const url = "https://v3-api.newscatcherapi.com/api/search";
const headers = {
  "x-api-token": process.env.NEXT_API_KEY,
  // 'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
};

export default async function GET(req: NextRequest) {
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

  const options: AxiosRequestConfig = {
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
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
