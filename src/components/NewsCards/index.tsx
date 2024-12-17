import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import { grey } from "@mui/material/colors";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectNews, setTopicsAvailable } from "../../slice/newsSlice";
import { useGetNewsApiQuery } from "../../services/newsApi";
import NewsCard from "./NewsCard";
import LoadingSkelton from "./LoadingSkelton";
import Pagination from "./Pagination";
import { ArticleDataType, TopicType } from "../../api/types";
import { sortData } from "../../utils/sort";
import { fetchNews } from "../../api/libs/fetchNews";

const useStyles = makeStyles(() => ({
  display: { fontFamily: "Roboto Condensed", marginTop: "0.5rem" },
  loading: {
    padding: "1rem",
    height: "100vh",
  },
  pagination: {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
  },
  message: {
    padding: "3rem 0",
  },
  fromto: {
    color: grey[600],
  },
}));

const Message = ({ msg, classname }: { msg: string; classname: string }) => (
  <Typography
    variant="h6"
    align="center"
    className={classname}
    style={{ padding: "3rem 0" }}
  >
    {msg}
  </Typography>
);

const NewsCards = () => {
  const classes = useStyles();

  const { q, lang, topic, page, from, to, fromLocal, toLocal, sources } =
    useAppSelector(selectNews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const data = await fetchNews();

      console.log("====================");
      console.log(data);
      console.log("====================");
    })();
  }, []);

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

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (news?.status === "ok") {
      const topicsFound = news.articles.map((article) => article.topic);
      dispatch(setTopicsAvailable([...new Set(topicsFound)] as TopicType[]));
    }
  }, [news]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (isError) {
    return (
      <Message
        msg="Something went wrong. Please try again."
        classname={classes.message}
      />
    );
  }

  return (
    <article>
      <Typography variant="subtitle1" className={classes.display}>
        {isFetching && <span>Loading...</span>}
        {!isFetching && topic && <span>Topic &apos;{topic}&apos;. </span>}
        {!isFetching && q && <span>Search by &apos;{q}&apos;. </span>}
        {!isFetching && sources && <span>Source &apos;{sources}&apos;. </span>}
        {!isFetching &&
          (news?.status === "ok"
            ? `Found ${news.total_hits} articles`
            : news?.status)}
        {!isFetching && (
          <span className={classes.fromto}>
            {" "}
            from {fromLocal} to {toLocal}
          </span>
        )}
      </Typography>

      <div className={classes.pagination}>
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

      <div className={classes.pagination}>
        <Pagination totalPages={news?.total_pages} />
      </div>
    </article>
  );
};

export default NewsCards;
