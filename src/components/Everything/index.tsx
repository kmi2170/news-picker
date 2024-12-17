import Image from "next/image";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

import { getTopHeadlines } from "../../app/lib/news/get-top-headlines";
import { getDummyTopHeadlines } from "../../lib/fetchDummyData/get-dummy-headlines";
import { transformHeadlines } from "../../lib/fetchDummyData/transformData/transformHeadlines";
import { timeFromNow } from "../../utils/time";
import { getEverything } from "../../app/lib/news/get-everything";
import { transformEverything } from "../../lib/fetchDummyData/transformData/transformEverything";
import { da } from "date-fns/locale";
import { getDummyEverything } from "../../lib/fetchDummyData/get-dummy-everything";

const Everything = async () => {
  // const data = await getEverything();
  const data = await getDummyEverything();
  const headlines = transformEverything(data);

  return (
    <Box>
      <Typography variant="h2">Everything</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        {headlines.map((headline, i) => {
          console.log(headline.imgUrl);
          return (
            <Card
              key={i}
              sx={{
                width: "100%",
              }}
            >
              <a href={headline.url} target="_blank" rel="noopener noreferrer">
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "space-between",
                    gap: "2rem",
                  }}
                >
                  <CardImage imgUrl={headline.imgUrl} />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "space-between",
                    }}
                  >
                    <Box sx={{}}>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        {headline?.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ width: "100%" }}
                      >
                        {headline?.description}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      align="right"
                      sx={{ color: "grey" }}
                    >
                      {timeFromNow(headline.publishedAt)}
                    </Typography>
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

export default Everything;

const CardImage = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <Box sx={{ width: "120px" }}>
      {imgUrl ? (
        <CardMedia
          component="img"
          src={imgUrl}
          alt={`headline ${imgUrl}`}
          sx={{ width: "100px", height: "100px" }}
        />
      ) : (
        <Box
          sx={{
            width: "100px",
            height: "100px",
            background: "lightgrey",
          }}
        />
      )}
    </Box>
  );
};
