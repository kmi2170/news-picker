import axios, { AxiosRequestConfig } from "axios";

const x_rapid_api_key = process.env.NEXT_PUBLIC_RAPID_API_KEY;

const options: AxiosRequestConfig = {
  method: "GET",
  url: "https://free-news.p.rapidapi.com/v1/search",
  timeout: 4500,
  headers: {
    // "x-rapidapi-key": "e55c60efe5msh73070d6e421d34bp11cc43jsn5f182a073484",
    "x-rapidapi-key": x_rapid_api_key,
    "x-rapidapi-host": "free-news.p.rapidapi.com",
  },
};

export const fetchNews = async (
  q: string,
  lang: string,
  page: string,
  from: string,
  to: string,
  topic: string,
  sources: string
) => {
  let params = {};
  q = q ? q : "news";
  if (topic && sources) {
    params = { q, lang, page, from, to, topic, sources };
  } else if (topic) {
    params = { q, lang, page, from, to, topic };
  } else if (sources) {
    params = { q, lang, page, from, to, sources };
  } else {
    params = { q, lang, page, from, to };
  }

  const optionsWithParams = { ...options, params };

  try {
    if (q && lang && page && from && to) {
      const { data } = await axios.request(optionsWithParams);
      // console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
