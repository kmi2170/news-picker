import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import NewsCard from "./NewsCard";
import LoadingSkelton from "./LoadingSkelton";
import Pagination from "./Pagination";

import { useAppSelector } from "../../app/hooks";
import { selectNews } from "../../features/newsSlice";
import { useGetNewsApiQuery } from "../../services/newsApi";

import { ArticleDataType } from "../../api/type_settngs";
import { sortData } from "../../utils/sort";

const useStyles = makeStyles(() => ({
  display: { fontFamily: "Roboto Condensed", marginTop: "0.5rem" },
  loading: {
    padding: "1rem",
    height: "100vh",
  },
  paginationContainer: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
  },
  error: {
    padding: "3rem 0",
  },
}));

const NewsCards: React.FC = () => {
  const classes = useStyles();

  const { q, lang, topic, page, from, to, sources } =
    useAppSelector(selectNews);

  const {
    data: news,
    isFetching,
    isError,
  } = useGetNewsApiQuery({
    q,
    lang,
    topic,
    page,
    from,
    to,
    sources,
  });

  console.log(news);
  if (isError)
    return (
      <Typography
        variant="h6"
        // color="error"
        align="center"
        className={classes.error}
      >
        Service is temporally unavailable due to the server problem. Please try
        again later.
      </Typography>
    );

  return (
    <article>
      <Typography variant="subtitle1" className={classes.display}>
        {news?.status === "ok"
          ? `Found ${news.total_hits} articles`
          : news?.status}
      </Typography>

      <div className={classes.paginationContainer}>
        <Pagination totalPages={news?.total_pages} />
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

      <div className={classes.paginationContainer}>
        <Pagination totalPages={news?.total_pages} />
      </div>
    </article>
  );
};

export default NewsCards;
