"use server";

import {
  EverythingArticle,
  EverythingReturnType,
  Language,
} from "../../api/types";
import { fetchNewsByQuery } from "../../services/news/fetch-news-by-query";
import { getDummyEverything } from "../../lib/fetchDummyData/get-dummy-everything";

export const getNewsByQuery = async (
  q: string,
  language: Language
): Promise<EverythingArticle[] | Error> => {
  try {
    const returnedData = (await fetchNewsByQuery(
      q,
      language
    )) as EverythingReturnType;

    // const returnedData = (await getDummyEverything()) as EverythingReturnType;

    const articles = returnedData?.articles
      ?.filter((article) => !article.title.includes("Removed"))
      .map((article) => {
        const {
          title,
          description,
          url,
          urlToImage,
          publishedAt,
          content,
          source,
        } = article;

        const _articles: EverythingArticle = {
          title,
          description,
          url,
          imgUrl: urlToImage,
          publishedAt,
          content,
          source: source.name,
        };
        return _articles;
      });
    return articles;
  } catch (error) {
    throw Error("Failed to fetch news");
  }
};
