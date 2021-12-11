import axios, { AxiosRequestConfig } from "axios";
import { QueryType } from "../type_settngs";

export const fetchNews = async (query: QueryType) => {
  const params = query;

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

  try {
    const { data } = await axios.request(options);
    /* console.log("fetchnews success");
    console.log(data); */
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
