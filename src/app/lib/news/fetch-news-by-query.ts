"use server";

import { EverythingReturnType, Language } from "../../../api/types";

const baseUrl = "https://newsapi.org/v2/everything";
const apiKey = process.env.NEWS_API_KEY as string;

export const fetchNewsByQuery = async (
  q: string,
  language: Language
): Promise<EverythingReturnType | Error> => {
  const searchParamsObj = {
    q: "us election",
    apiKey,
    // language: "us",
    pageSize: "20",
  };

  const searchParams = new URLSearchParams(searchParamsObj);
  const url = `${baseUrl}?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error("Failed to fetch Headlines");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};
