// import { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import NewsCard from './NewsCard';
import Loading from './Loading';
import LoadingSkelton from './LoadingSkelton';
import Pagination from './Pagination';

import { IData, IArticle } from '../../api/type_settngs';
import { sortData } from '../../utils/sort';

const useStyles = makeStyles((theme: Theme) => ({
  display: { fontFamily: 'Roboto Condensed', marginTop: '0.5rem' },
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

const sortedArticle = (article: IArticle[], name: string) => {
  return sortData(article, name);
};

interface NewsCardsProps {
  news: IData;
  lang: string;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const NewsCards: React.FC<NewsCardsProps> = ({
  news,
  lang,
  isLoading,
  setIsLoading,
}) => {
  const classes = useStyles();

  return (
    <article>
      <>
        <Typography variant="subtitle1" className={classes.display}>
          {news?.status === 'ok'
            ? `Found ${news.total_hits} articles`
            : news?.status}
        </Typography>

        <div className={classes.paginationWrapper}>
          <Pagination
            setIsLoading={setIsLoading}
            currentPage={news?.page}
            totalPages={news?.total_pages}
          />
        </div>

        {isLoading ? (
          <LoadingSkelton />
        ) : (
          <Grid container justifyContent="space-between" spacing={2}>
            {news?.articles &&
              sortedArticle(news.articles, 'published_date').map(
                (article: IArticle) => (
                  <Grid item key={article._id} xs={12} sm={6} md={4}>
                    <NewsCard article={article} lang={lang} />
                  </Grid>
                )
              )}
          </Grid>
        )}

        <div className={classes.paginationWrapper}>
          <Pagination
            setIsLoading={setIsLoading}
            currentPage={news?.page}
            totalPages={news?.total_pages}
          />
        </div>
      </>
    </article>
  );
};

export default NewsCards;
