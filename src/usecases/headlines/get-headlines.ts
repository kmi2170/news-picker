import {
  HeadlineArticle,
  HeadlineCategoryQuery,
  HeadlinesReturnType,
} from "../../api/types";
import { fetchHeadlines } from "../../services/headlines/fetch-headlines";
// import { getDummyTopHeadlines } from "../../lib/fetchDummyData/get-dummy-headlines";

export const getHeadlines = async (
  category: HeadlineCategoryQuery
): Promise<HeadlineArticle[] | Error> => {
  try {
    const returnedData = (await fetchHeadlines(
      category
    )) as HeadlinesReturnType;
    // const returnedData = (await getDummyTopHeadlines()) as HeadlinesReturnType;

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
  } catch (error) {
    throw Error(error);
  }
};
