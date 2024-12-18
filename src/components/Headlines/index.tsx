import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

import CardImage from "../common/card-media";
import PublishedTime from "../common/published-time";
import { getTopHeadlines } from "../../app/lib/news/get-top-headlines";
import { getDummyTopHeadlines } from "../../lib/fetchDummyData/get-dummy-headlines";
import { transformHeadlines } from "../../lib/fetchDummyData/transformData/transformHeadlines";
import { timePeriodFromNow, convertToLocalTime } from "../../utils/time";

const Headlines = async () => {
  // const data = await getTopHeadlines();
  const data = await getDummyTopHeadlines();
  const headlines = transformHeadlines(data);
  console.log("headlines >>>");

  return (
    <Box>
      <Typography variant="h2">Top Headlines</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {headlines.map((headline, i) => {
          return (
            <Card
              key={i}
              sx={{
                width: "100%",
              }}
              elevation={4}
            >
              <a href={headline.url} target="_blank" rel="noopener noreferrer">
                <CardImage
                  imgUrl={headline.imgUrl}
                  width="85px"
                  height="85px"
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "space-between",
                    gap: "2rem",
                    "&:hover": {
                      background: "rgba(224,255,255, 0.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "space-between",
                    }}
                  >
                    <Title title={headline.title} />
                    <PublishedTime
                      publishedAt={headline.publishedAt}
                      withTime
                    />
                  </Box>
                </CardContent>
              </a>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default Headlines;

const Title = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom={!!description}
        sx={{ fontWeight: "bold" }}
      >
        {title}
      </Typography>
      {description && (
        <Typography variant="subtitle1" sx={{ width: "100%" }}>
          {description}
        </Typography>
      )}
    </>
  );
};
