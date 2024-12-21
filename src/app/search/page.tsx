import { Suspense } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import News from "../../components/news";
import SearchNews from "../../components/search/search-bar";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: Promise<string>;
    language?: Promise<string>;
    page?: Promise<string>;
  };
}) {
  const q = ((await searchParams)?.q || "") as string;
  const language = ((await searchParams)?.language || "en") as string;
  const page = Number((await searchParams)?.page) || 1;

  return (
    <Container maxWidth="xl">
      <Typography
        component="h2"
        variant="h4"
        sx={{ mt: "1rem", mb: "1rem", fontWeight: "bold" }}
      >
        Search News by Keyword
      </Typography>
      <SearchNews />;
      <Suspense fallback={<div>Loading Everything ....</div>}>
        <News q={q} language={language} page={page} />
      </Suspense>
    </Container>
  );
}
