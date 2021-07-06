import { useState, useEffect } from 'react';

import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

import clsx from 'clsx';
import moment from 'moment';

import { IArticle } from '../api/type_settngs';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 345,
    //height: 230,
    minHeight: 230,
  },
  text: {
    ///fontFamily: 'Noto Sans JP',
    fontFamily: 'Roboto Condensed',
    fontWeight: 400,
  },
  imgPlace: {
    width: 345,
    height: 100,
    color: 'white',
    //background: grey[400],
    background: `linear-gradient(45deg, ${grey[700]}, ${grey[400]})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrappersummary: {
    height: 100,
    // background:
    //   'linear-gradient(to bottom, rgb(255,255,255,0), rgba(25,25,255,1))',
    //'linear-gradient(rgba(255, 255, 255, 0), #ffffff)',
    backgroundImage:
      'linear-gradient(to bottom, rgb(255,255,255,0), rgba(255,255,255,1))',
  },
  summary: {
    //'rgb(25,25,255,1)',
  },
}));

interface NewsCardProps {
  article: IArticle;
}

const NesCard: React.FC<NewsCardProps> = ({ article }) => {
  const classes = useStyles();

  const { title, published_date, link, summary, media } = article;

  return (
    <Card className={classes.root}>
      {media ? (
        <CardMedia
          component="img"
          alt={title}
          height="100"
          width="345"
          image={media}
          title={title}
        />
      ) : (
        <div className={classes.imgPlace}>
          <Typography gutterBottom variant="h5" component="div">
            NEWS
          </Typography>
        </div>
      )}
      <CardContent>
        <Typography variant="h6" className={classes.text}>
          {title}
        </Typography>
        <div className={classes.wrappersummary}>
          <Typography
            variant="body1"
            className={clsx(classes.text, classes.summary)}
          >
            {summary}
          </Typography>
        </div>
        <Typography variant="subtitle2" color="textSecondary" align="right">
          {moment(published_date).fromNow()}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default NesCard;
