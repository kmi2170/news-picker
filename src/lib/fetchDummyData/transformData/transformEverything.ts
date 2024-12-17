import { EverythingArticle, EverythingReturnType } from "../../../api/types";

export const transformEverything = (
  returnedData: EverythingReturnType
): EverythingArticle[] => {
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
};
