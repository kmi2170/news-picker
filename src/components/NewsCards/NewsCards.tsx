import { Grid, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import NewsCard from "./NewsCard";
import LoadingSkelton from "./LoadingSkelton";
import Pagination from "./Pagination";

import { useAppSelector } from "../../app/hooks";
import { selectNews } from "../../features/newsSlice";
import { useGetNewsApiQuery } from "../../services/newsApi";

import { NewsDataType, ArticleDataType } from "../../api/type_settngs";
import { sortData } from "../../utils/sort";

const useStyles = makeStyles((theme: Theme) => ({
  display: { fontFamily: "Roboto Condensed", marginTop: "0.5rem" },
  loading: {
    padding: "1rem",
    height: "100vh",
  },
  paginationWrapper: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
  },
}));

// const sortedArticle = (article: ArticleDataType[], sortby: string) => {
//   return sortData(article, sortby);
// };

// interface NewsCardsProps {
//   isLoading: boolean;
//   setIsLoading: (isLoading: boolean) => void;
// }

// const NewsCards: React.FC<NewsCardsProps> = ({ isLoading, setIsLoading }) => {
const NewsCards: React.FC = () => {
  const classes = useStyles();

  const { lang, topic } = useAppSelector(selectNews);

  const q = "news";
  const { data: news, isFetching } = useGetNewsApiQuery({ q, lang, topic });
  // console.log("newscards data", data);

  return (
    <article>
      <>
        <Typography variant="subtitle1" className={classes.display}>
          {news?.status === "ok"
            ? `Found ${news.total_hits} articles`
            : news?.status}
        </Typography>

        <div className={classes.paginationWrapper}>
          <Pagination
            // setIsLoading={setIsLoading}
            currentPage={news?.page}
            totalPages={news?.total_pages}
          />
        </div>

        {isFetching ? (
          <LoadingSkelton />
        ) : (
          <Grid container justifyContent="space-between" spacing={2}>
            {news?.articles &&
              sortData(news.articles, "published_date").map(
                (article: ArticleDataType) => (
                  <Grid item key={article._id} xs={12} sm={6} md={4}>
                    <NewsCard article={article} lang={lang} />
                  </Grid>
                )
              )}
          </Grid>
        )}

        <div className={classes.paginationWrapper}>
          <Pagination
            // setIsLoading={setIsLoading}
            currentPage={news?.page}
            totalPages={news?.total_pages}
          />
        </div>
      </>
    </article>
  );
};

export default NewsCards;
