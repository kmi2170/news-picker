import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

import { HEADLINES_PAGINATION_PER_PAGE } from "../../constants/pagination";

const HeadlinesSkeleton = async () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {Array(HEADLINES_PAGINATION_PER_PAGE)
        .fill(null)
        .map((_, i) => {
          return (
            <Card
              key={i}
              elevation={4}
              sx={{
                width: "100%",
                height: { xs: "150px", sm: "100px" },
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "110px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Skeleton variant="rectangular" width="85px" height="85px" />
              </Box>
              <CardContent
                sx={{
                  pb: "0.5rem",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Skeleton variant="rectangular" width="100%" height="1rem" />
                <Skeleton variant="rectangular" width="100%" height="1rem" />

                <Skeleton variant="rectangular" width="8rem" height="1rem" />
              </CardContent>
            </Card>
          );
        })}
    </Box>
  );
};

export default HeadlinesSkeleton;
