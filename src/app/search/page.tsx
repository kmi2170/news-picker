import { Suspense } from "react";

import News from "../../components/news";
import SearchNews from "../../components/search/search-bar";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
    language?: string;
  };
}) {
  const q = (await searchParams)?.q || "";
  const language = (await searchParams)?.language || "en";

  return (
    <>
      <SearchNews />;
      <Suspense fallback={<div>Loading Everything ....</div>}>
        <News q={q} language={language} />
      </Suspense>
    </>
  );
}
