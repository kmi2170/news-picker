import { Suspense } from "react";

import Headlines from "../../components/headlines";
import { HeadlineCategoryQuery } from "../../api/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const category = (searchParams.category || "all") as HeadlineCategoryQuery;

  return (
    <Suspense fallback={<div>Loading Headlines ....</div>}>
      <Headlines category={category} page={page} />
    </Suspense>
  );
}
