import axios, { AxiosRequestConfig } from "axios";

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

  const options: AxiosRequestConfig = {
    method: "GET",
    url: "https://free-news.p.rapidapi.com/v1/search",
    timeout: 4500,
    params,
    headers: {
      /* "x-rapidapi-key": "e55c60efe5msh73070d6e421d34bp11cc43jsn5f182a073484",
      "x-rapidapi-host": "free-news.p.rapidapi.com", */
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
  };
  console.log("api_key", process.env.NEXT_PUBLIC_RAPID_API_KEY);
  console.log("api_host", process.env.NEXT_PUBLIC_RAPID_API_HOST);

  try {
    if (q && lang && page && from && to) {
      const { data } = await axios.request(options);
      // console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
