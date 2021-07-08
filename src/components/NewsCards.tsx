// import { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import NewsCard from './NewsCard';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';

import { IData, IArticle } from '../api/type_settngs';

const useStyles = makeStyles((theme: Theme) => ({
  text: { fontFamily: 'Roboto Condensed' },
  loading: {
    padding: '1rem',
    height: '100vh',
  },
  paginationWrapper: {
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
}));

interface NewsCardsProps {
  news: IData;
  isLoading: boolean;
}

const NewsCards: React.FC<NewsCardsProps> = ({ news, isLoading }) => {
  const classes = useStyles();

  // const { total_hits, page, total_pages, page_size } = news;

  return (
    <article>
      {isLoading ? (
        <div className={classes.loading}>
          <Loading />
        </div>
      ) : (
        <>
          <Typography variant="subtitle1" className={classes.text}>
            {news?.total_hits === 0
              ? 'Found 0 article'
              : `Found ${news.total_hits} articles`}
          </Typography>

          <div className={classes.paginationWrapper}>
            <Pagination currentPage={news.page} totalPages={news.total_pages} />
          </div>

          <Grid container spacing={3}>
            {news?.articles?.map((article: IArticle) => (
              <Grid item key={article._id} xs={12} sm={6} md={4}>
                <NewsCard article={article} />
              </Grid>
            ))}
          </Grid>

          <div className={classes.paginationWrapper}>
            <Pagination currentPage={news.page} totalPages={news.total_pages} />
          </div>
        </>
      )}
    </article>
  );
};

export default NewsCards;
