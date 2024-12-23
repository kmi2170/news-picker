import { headlinesCategories } from "../assets/headlines-categories";

export type Language = "en" | "jp";

export type BaseReturnType = {
  status: string;
  totalResults: number;
  articles: {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
};

export type BaseArticle = {
  title: string;
  description: string;
  url: string;
  imgUrl: string;
  publishedAt: string;
  content: string;
  source: string;
};

export type HeadlinesReturnType = BaseReturnType;
export type HeadlineArticle = BaseArticle;

export type EverythingReturnType = BaseReturnType;
export type EverythingArticle = BaseArticle;

type HeadlinesCategory = (typeof headlinesCategories)[number];

export type HeadlineCategoryQuery = HeadlinesCategory["query"];
