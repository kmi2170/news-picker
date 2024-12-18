import { Suspense } from "react";

import Container from "@mui/material/Container";

import Everything from "../components/Everything";
import Headlines from "../components/Headlines";

export default async function Page() {
  return (
    <Container maxWidth="xl">
      {/* <Suspense fallback={<div>Loading Headlines ....</div>}>
        <Headlines />
      </Suspense> */}
      <Suspense fallback={<div>Loading Everything ....</div>}>
        <Everything />
      </Suspense>
    </Container>
  );
}
