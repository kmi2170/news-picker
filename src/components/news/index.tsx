import Link from "next/link";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CardImage from "../common/card-media";
import PublishedTime from "../common/published-time";
import BottomPagination from "../common/bottom-pagination";
import { getNewsByQuery } from "../../usecases/news/get-news-by-query";
import ImageOverlay from "../common/image-overlay";
import { Language } from "../../api/types";

const per_page = (process.env.NEWS_PAGINATION_PER_PAGE || 20) as number;

type NewsProps = {
  q: string;
  language: Language;
  page?: number;
};

const News = async ({ q, language, page = 1 }: NewsProps) => {
  const news = await getNewsByQuery(q, language);

  if (!news || news instanceof Error) return;

  const totalNumOfPages = Math.ceil(news.length / per_page);

  const slicedNews = news.slice((page - 1) * per_page, page * per_page);

  return (
    <>
      <Grid container spacing={2}>
        {slicedNews?.map((headline, i) => {
          return (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
              <Card raised sx={{ position: "relative", height: "375px" }}>
                <Link
                  href={headline.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImageOverlay height="200px">
                    <CardImage imgUrl={headline.imgUrl} height="200px" />
                  </ImageOverlay>

                  <CardHeader
                    title={headline.title}
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      position: "absolute",
                      top: 0,
                      zIndex: 20,
                    }}
                  />

                  <CardContent>
                    <Typography variant="subtitle1" sx={{ width: "100%" }}>
                      {headline?.description}
                    </Typography>

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 5,
                        right: 10,
                      }}
                    >
                      <PublishedTime
                        publishedAt={headline.publishedAt}
                        withTime
                      />
                    </Box>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BottomPagination count={totalNumOfPages} page={page} />
      </Box>
    </>
  );
};

export default News;
