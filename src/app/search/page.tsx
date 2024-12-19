import { Suspense } from "react";

import News from "../../components/news";
import SearchNews from "../../components/search/search-bar";

export default async function Page({
  params,
}: {
  params: {
    q?: Promise<string>;
    language?: Promise<string>;
    page?: Promise<string>;
  };
}) {
  const q = ((await params)?.q || "") as string;
  const language = ((await params)?.language || "en") as string;
  const page = Number((await params)?.page) || 1;

  return (
    <>
      <SearchNews />;
      <Suspense fallback={<div>Loading Everything ....</div>}>
        <News q={q} language={language} page={page} />
      </Suspense>
    </>
  );
}
