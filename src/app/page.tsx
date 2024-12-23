import { Suspense } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Headlines from "../components/headlines";
import HeadlinesCategoryButtons from "../components/headlines/category-buttons";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  return (
    <Container maxWidth="lg">
      <Typography
        component="h2"
        variant="h4"
        sx={{ mt: "1rem", mb: "1rem", fontWeight: "bold" }}
      >
        Headlines
      </Typography>

      <HeadlinesCategoryButtons />

      <Suspense fallback={<div>Loading Headlines ....</div>}>
        <Headlines page={page} />
      </Suspense>
    </Container>
  );
}
