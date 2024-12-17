"use server";

import axios, { AxiosRequestConfig } from "axios";

const url = "https://newsapi.org/v2/everything";
const headers = {
  "X-Api-key": process.env.NEWS_API_KEY,
};

export const getEverything = async () => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url,
    params: {
      q: "f1",
      // country: "jp",
      // lang: "jp",
    },
    headers,
  };

  console.log(options);

  try {
    // const { data } = await axios.get<NewsDataType>(url, { params, headers });
    const { data } = await axios.request(options);
    console.log(">>>>>>>>>", data);
  } catch (error) {
    console.error(error);
  }
};
