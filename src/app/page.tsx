import { Suspense } from "react";

import News from "../components/news";
import Headlines from "../components/headlines";

export default async function Page() {
  return (
    <>
      {/* <Suspense fallback={<div>Loading Headlines ....</div>}>
        <Headlines />
      </Suspense> */}
      <Suspense fallback={<div>Loading Everything ....</div>}>
        <News />
      </Suspense>
    </>
  );
}
