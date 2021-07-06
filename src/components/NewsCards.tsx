// import { useState, useEffect } from 'react';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import NewsCard from './NewsCard';
import Loading from '../components/Loading';

import { IData, IArticle } from '../api/type_settngs';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

interface NewsCardsProps {
  news: IData;
  isLoading: boolean;
}

const NewsCards: React.FC<NewsCardsProps> = ({ news, isLoading }) => {
  const classes = useStyles();

  if (isLoading) <Loading />;

  return (
    <main>
      <Grid container spacing={3}>
        {news?.articles?.map((article: IArticle) => (
          <Grid item key={article._id}>
            <NewsCard article={article} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default NewsCards;
