import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

import ImageOverlay from "../common/image-overlay";
import { NEWS_PAGINATION_PER_PAGE as per_page } from "../../constants/pagination";

const NewsSkeleton = async () => {
  return (
    <Grid container spacing={2}>
      {Array(per_page)
        .fill(null)
        .map((headline, i) => {
          return (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
              <Card raised sx={{ position: "relative", height: "375px" }}>
                <ImageOverlay height="200px">
                  <Skeleton variant="rectangular" width="100%" height="200px" />
                </ImageOverlay>

                <CardContent>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="1rem"
                    sx={{ mb: "0.5rem" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="1rem"
                    sx={{ mb: "0.5rem" }}
                  />
                  <Skeleton variant="rectangular" width="100%" height="1rem" />

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 5,
                      right: 10,
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="8rem"
                      height="1rem"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default NewsSkeleton;
