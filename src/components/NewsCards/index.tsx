import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectNews, setTopicsAvailable } from '../../features/newsSlice';
import { useGetNewsApiQuery } from '../../services/newsApi';
import NewsCard from './NewsCard';
import LoadingSkelton from './LoadingSkelton';
import Pagination from './Pagination';
import { ArticleDataType, TopicType } from '../../api/type_settngs';
import { sortData } from '../../utils/sort';
import { useEffect } from 'react';

const useStyles = makeStyles(() => ({
  display: { fontFamily: 'Roboto Condensed', marginTop: '0.5rem' },
  loading: {
    padding: '1rem',
    height: '100vh',
  },
  pagination: {
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  message: {
    padding: '3rem 0',
  },
}));

const Message = ({ msg, classname }: { msg: string; classname: string }) => (
  <Typography
    variant="h6"
    align="center"
    className={classname}
    style={{ padding: '3rem 0' }}
  >
    {msg}
  </Typography>
);

const NewsCards = () => {
  const classes = useStyles();

  const { q, lang, topic, page, from, to, sources } =
    useAppSelector(selectNews);
  const dispatch = useAppDispatch();

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
    if (news?.status === 'ok') {
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
        {!isFetching &&
          (news?.status === 'ok'
            ? `Found ${news.total_hits} articles`
            : news?.status)}
      </Typography>

      <div className={classes.pagination}>
        <Pagination totalPages={news?.total_pages} />
      </div>

      {isFetching ? (
        <LoadingSkelton />
      ) : (
        <Grid container justifyContent="space-between" spacing={2}>
          {news?.articles &&
            sortData(news.articles, 'published_date').map(
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
