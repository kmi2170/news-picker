import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CardImage from "../common/card-media";
import PublishedTime from "../common/published-time";
import { getHeadlines } from "../../usecases/headlines/get-headlines";
import BottomPagination from "../common/bottom-pagination";
import { HeadlineCategoryQuery } from "../../api/types";
import { HEADLINES_PAGINATION_PER_PAGE as per_page } from "../../constants/pagination";

type HeadlinesProps = {
  category: HeadlineCategoryQuery;
  page: number;
};

const Headlines = async ({ category, page }: HeadlinesProps) => {
  const headlines = await getHeadlines(category);

  if (!headlines || headlines instanceof Error) return;

  const totalNumOfPages = Math.ceil(headlines?.length / per_page);

  const slicedHeadlines = headlines?.slice(
    (page - 1) * per_page,
    page * per_page
  );

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
      {slicedHeadlines.map((headline, i) => {
        return (
          <Card
            key={i}
            component="a"
            href={headline.url}
            target="_blank"
            rel="noopener noreferrer"
            elevation={4}
            sx={{
              width: "100%",
              height: { xs: "110px", sm: "100px" },
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                ml: { xs: "0.5rem", sm: 0 },
                width: "110px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardImage imgUrl={headline.imgUrl} width="85px" height="85px" />
            </Box>
            <CardContent
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                "&:hover": {
                  background: "rgba(224,255,255, 0.2)",
                },
                pb: "0.5rem !important",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  lineHeight: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {headline.title}
              </Typography>

              <PublishedTime publishedAt={headline.publishedAt} withTime />
            </CardContent>
          </Card>
        );
      })}

      <BottomPagination count={totalNumOfPages} page={page} />
    </Box>
  );
};

export default Headlines;
