import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CardImage from "../common/card-media";
import GradientBackdrop from "../common/gradient-backdrop";
import PublishedTime from "../common/published-time";
import { getEverything } from "../../app/lib/news/get-everything";
import { transformEverything } from "../../lib/fetchDummyData/transformData/transformEverything";
import { getDummyEverything } from "../../lib/fetchDummyData/get-dummy-everything";

const Everything = async () => {
  // const data = await getEverything();
  const data = await getDummyEverything();
  const headlines = transformEverything(data);

  return (
    <Box>
      <Typography variant="h2">Everything</Typography>

      <Grid container spacing={2}>
        {headlines.map((headline, i) => {
          console.log(headline.imgUrl);
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
                  <CardImage imgUrl={headline.imgUrl} height="200px" />
                  <GradientBackdrop height="200px" />
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

export default Everything;
