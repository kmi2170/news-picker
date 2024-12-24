import { Suspense } from "react";

import News from "../../components/news";
import NewsSkeleton from "../../components/skeletons/news-skeletons";
import { Language } from "../../api/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const q = (searchParams?.q || "") as string;
  const language = (searchParams?.language || "en") as Language;
  const page = Number(searchParams?.page) || 1;

  return (
    <>
      {q && (
        <Suspense fallback={<NewsSkeleton />}>
          <News q={q} language={language} page={page} />
        </Suspense>
      )}
    </>
  );
}
