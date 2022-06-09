import { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ButtonBase from "@material-ui/core/ButtonBase";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

import { ArticleDataType } from "../../../api/type_settngs";
import { timeFromNow } from "../../../utils/time";

const useStyles = makeStyles(() => ({
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

const NesCard = ({ article, lang }: NewsCardProps) => {
  const classes = useStyles();
  const articleRef = useRef<HTMLHeadElement>();

  const { title, published_date, link, summary, media, clean_url } = article;

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
        <CardContent
          style={{
            paddingBottom: 0,
          }}
        >
          <Tooltip title={lang === "ja" ? "元の記事を読む" : "View Source"}>
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
            <Typography variant="body1" className={classes.textSummary}>
              {summary}
            </Typography>
          </div>
          <div className={classes.overlay} hidden={showMore} />

          {showMore && (
            <ButtonBase onClick={handleClick}>
              <Typography variant="subtitle2" color="primary" style={{ marginTop: '5px' }}>
                {lang === "ja" ? "元の記事を読む" : "View Source"}
              </Typography>
            </ButtonBase>
          )}

          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={4}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="left"
              >
                {clean_url}
              </Typography>
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
                {timeFromNow(published_date)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default NesCard;
