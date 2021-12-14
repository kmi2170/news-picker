import { useState, useRef } from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  ButtonBase,
  Tooltip,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

import clsx from "clsx";
import moment from "moment";

import { ArticleDataType } from "../../api/type_settngs";
// import { utcToLocalTime } from '../utils/utcToLocalTime';

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    display: "flex",
    justifyContent: "center",
  },
  root: {
    width: 345,
    minHeight: 200,
  },
  textTitle: {
    ///fontFamily: 'Noto Sans JP',
    fontFamily: "Roboto Condensed",
    fontWeight: 400,
    "&:hover": {
      background: grey[1100],
    },
  },
  textSummary: {
    ///fontFamily: 'Noto Sans JP',
    fontFamily: "Roboto Condensed",
    fontWeight: 400,
  },
  imgPlace: {
    width: 345,
    height: 100,
    color: "white",
    background: `linear-gradient(45deg, ${grey[700]}, ${grey[400]})`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  summary: {
    marginTop: "1rem",
    height: 80,
    overflow: "hidden",
    // border: '1px solid blue',
  },
  summaryExpand: {
    width: "100%",
  },
  overlay: {
    height: 35,
    width: "100%",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
    bottom: 35,
    position: "relative",
    // border: '1px solid red',
    // zIndex: 1010,
    marginBottom: -35,
  },
  buttonBase: {
    display: "flex",
    flexDirection: "column",
  },
}));

interface NewsCardProps {
  article: ArticleDataType;
  lang: string;
}

const NesCard: React.FC<NewsCardProps> = ({ article, lang }) => {
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

  const handleClick = () => {
    window.open(link, "_blank", "noreferrer");
  };

  return (
    <div className={classes.cardContainer}>
      <Card ref={articleRef} className={classes.root}>
        <CardMedia
          component="img"
          alt={title}
          height="175"
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
            paddingBottom: 0,
          }}
        >
          <Tooltip title={lang === "ja" ? "元の記事へ" : "View Source"}>
            <ButtonBase onClick={handleClick}>
              <Typography variant="h6" className={classes.textTitle}>
                {title}
              </Typography>
            </ButtonBase>
          </Tooltip>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {showMore && (
              <IconButton onClick={handleExpandClick}>
                <ExpandLess />
              </IconButton>
            )}
          </div>

          <div className={showMore ? classes.summaryExpand : classes.summary}>
            <Typography variant="body1" className={clsx(classes.textSummary)}>
              {summary}
            </Typography>
          </div>
          <div className={classes.overlay} hidden={showMore} />

          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={4}>
              {showMore && (
                <ButtonBase onClick={handleClick}>
                  <Typography variant="subtitle2" color="primary" align="left">
                    {lang === "ja" ? "元の記事へ" : "View Source"}
                  </Typography>
                </ButtonBase>
              )}
            </Grid>

            <Grid item xs={4}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <IconButton
                  onClick={handleExpandClick}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {showMore ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </div>
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="right"
              >
                {moment.utc(published_date).fromNow()}
                {/* {moment(utcToLocalTime(published_date)).fromNow()} */}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default NesCard;
