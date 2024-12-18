import { Suspense } from "react";

import News from "../../components/news";
import SearchNews from "../../components/search/search-bar";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
    language?: string;
    page?: string;
  };
}) {
  const q = (await searchParams)?.q || "";
  const language = (await searchParams)?.language || "en";
  const page = Number((await searchParams)?.page) || 1;

  return (
    <>
      <SearchNews />;
      <Suspense fallback={<div>Loading Everything ....</div>}>
        <News q={q} language={language} page={page} />
      </Suspense>
    </>
  );
}
