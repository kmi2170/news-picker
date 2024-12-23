import { Suspense } from "react";

import Headlines from "../../components/headlines";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  return (
    <Suspense fallback={<div>Loading Headlines ....</div>}>
      <Headlines page={page} />
    </Suspense>
  );
}
