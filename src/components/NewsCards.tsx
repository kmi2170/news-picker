// import { useState, useEffect } from 'react';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import NewsCard from './NewsCard';
import Loading from '../components/Loading';

import { IData, IArticle } from '../api/type_settngs';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  loading: {
    padding: '1rem',
    height: '100vh',
  },
}));

interface NewsCardsProps {
  news: IData;
  isLoading: boolean;
}

const NewsCards: React.FC<NewsCardsProps> = ({ news, isLoading }) => {
  const classes = useStyles();

  // if (isLoading) <Loading />;

  return (
    <article>
      {isLoading ? (
        <div className={classes.loading}>
          <Loading />
        </div>
      ) : (
        <Grid container spacing={3}>
          {news?.articles?.map((article: IArticle) => (
            <Grid item key={article._id}>
              <NewsCard article={article} />
            </Grid>
          ))}
        </Grid>
      )}
    </article>
  );
};

export default NewsCards;
