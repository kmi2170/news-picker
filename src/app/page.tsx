import { Suspense } from "react";

import News from "../components/news";
import Headlines from "../components/headlines";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const page = Number(await searchParams.page) || 1;

  return (
    <>
      <Suspense fallback={<div>Loading Headlines ....</div>}>
        <Headlines page={page} />
      </Suspense>
      {/* <Suspense fallback={<div>Loading Everything ....</div>}>
        <News />
      </Suspense> */}
    </>
  );
}
