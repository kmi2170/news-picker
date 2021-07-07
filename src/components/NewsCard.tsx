import { useState, useRef } from 'react';

import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  Grid,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

import clsx from 'clsx';
import moment from 'moment';

import { IArticle } from '../api/type_settngs';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 345,
    minHeight: 200,
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
    background: `linear-gradient(45deg, ${grey[700]}, ${grey[400]})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summary: {
    height: 80,
    overflow: 'hidden',
    border: '1px solid blue',
  },
  summaryExpand: {
    width: '100%',
  },
  overlay: {
    height: 35,
    width: '100%',
    backgroundImage:
      'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
    bottom: 35,
    position: 'relative',
    border: '1px solid red',
    zIndex: 2000,
    marginBottom: -35,
  },
}));

interface NewsCardProps {
  article: IArticle;
}

const NesCard: React.FC<NewsCardProps> = ({ article }) => {
  const classes = useStyles();
  const articleRef = useRef<HTMLHeadElement>();

  const { title, published_date, link, summary, media } = article;

  const [showMore, setShowMore] = useState(false);

  const handleExpandClick = () => {
    if (showMore) {
      // articleRef?.current?.scrollIntoView({ behavior: 'smooth' });
      window.scroll(0, articleRef?.current?.offsetTop - 50);
    }

    setShowMore((prev) => !prev);
  };

  return (
    <Card ref={articleRef} className={classes.root}>
      <CardMedia
        component="img"
        alt={title}
        height="100"
        width="345"
        image={media}
        title={title}
      />
      {/* 
        <div className={classes.imgPlace}>
          <Typography gutterBottom variant="h5" component="div">
            NEWS
          </Typography>
        </div>
      */}
      <CardContent
        style={{
          border: '1px solid green',
          // marginBottom: -30,
          paddingBottom: 0,
        }}
      >
        <Typography variant="h6" className={classes.text}>
          {title}
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {showMore && (
            <IconButton onClick={handleExpandClick}>
              <ExpandLess />
            </IconButton>
          )}
        </div>

        <div className={showMore ? classes.summaryExpand : classes.summary}>
          <Typography variant="body1" className={clsx(classes.text)}>
            {summary}
          </Typography>
        </div>
        <div className={classes.overlay} hidden={showMore} />

        <Grid container justify="center" alignItems="center">
          <Grid item xs={4}></Grid>

          <Grid item xs={4}>
            <IconButton onClick={handleExpandClick}>
              {showMore ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="subtitle2" color="textSecondary" align="right">
              {moment(published_date).fromNow()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NesCard;
