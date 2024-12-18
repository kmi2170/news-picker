import { ar } from "date-fns/locale";
import { HeadlineArticle, HeadlinesReturnType } from "../api/types";

export const transformHeadlines = (
  returnedData: HeadlinesReturnType
): HeadlineArticle[] => {
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

      const _articles: HeadlineArticle = {
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
};
