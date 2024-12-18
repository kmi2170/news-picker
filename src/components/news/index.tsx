import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CardImage from "../common/card-media";
import PublishedTime from "../common/published-time";
import { getNewsByQuery } from "../../usecases/get-news-by-query";
import { EverythingArticle } from "../../api/types";
import OverlayImage from "../common/overlay-image";

type NewsProps = {
  q?: string;
  language?: string;
};

const News = async ({ q, language }: NewsProps) => {
  const news = await getNewsByQuery("test", "en");

  if (!news) return;

  return (
    <Box>
      <Grid container spacing={2}>
        {news?.map((headline, i) => {
          return (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
              <Card
                key={i}
                raised
                sx={{ position: "relative", height: "375px" }}
              >
                <a
                  href={headline.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <OverlayImage height="200px">
                    <CardImage imgUrl={headline.imgUrl} height="200px" />
                  </OverlayImage>

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
                        withFromNow
                      />
                    </Box>
                  </CardContent>
                </a>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default News;
