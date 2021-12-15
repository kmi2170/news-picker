import axios from "axios";

const url = "https://free-news.p.rapidapi.com/v1/search";

const headers = {
  "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
  "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
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

  try {
    if (q && lang && page && from && to) {
      const { data } = await axios.get(url, { params, headers });
      // console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
