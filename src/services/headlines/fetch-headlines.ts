"use server";

import { HeadlinesReturnType } from "../../api/types";

const baseUrl = "https://newsapi.org/v2/top-headlines";
const apiKey = process.env.NEWS_API_KEY as string;

export const fetchHeadlines = async (): Promise<
  HeadlinesReturnType | Error
> => {
  const searchParamsObj = {
    // country: "us",
    category: "business",
    apiKey,
    pageSize: "100",
  };

  const searchParams = new URLSearchParams(searchParamsObj);
  const url = `${baseUrl}?${searchParams.toString()}`;

  try {
    const response = await fetch(url, { cache: "force-cache" });
    if (!response.ok) {
      throw Error("Failed to fetch Headlines");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw Error(error);
  }
};
