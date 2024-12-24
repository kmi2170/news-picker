import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CardImage from "../common/card-media";
import PublishedTime from "../common/published-time";
import { getHeadlines } from "../../usecases/headlines/get-headlines";
import BottomPagination from "../common/bottom-pagination";
import { HeadlineCategoryQuery } from "../../api/types";

type HeadlinesProps = {
  category: HeadlineCategoryQuery;
  page: number;
};

const per_page = (process.env.HEADLINES_PAGINATION_PER_PAGE || 20) as number;

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
                // pt: "0 !important",
                pb: "0.5rem !important",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  lineHeight: "1.25rem",
                  maxLines: 3,
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
