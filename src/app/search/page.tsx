import { Suspense } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import News from "../../components/news";
import SearchNews from "../../components/search/search-bar";
import { Language } from "../../api/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const q = (searchParams?.q || "") as string;
  const language = (searchParams?.language || "en") as Language;
  const page = Number(searchParams?.page) || 1;

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
      {q && (
        <Suspense fallback={<div>Loading Everything ....</div>}>
          <News q={q} language={language} page={page} />
        </Suspense>
      )}
    </Container>
  );
}
