import { Suspense } from "react";

import Container from "@mui/material/Container";

import Headlines from "../components/Headlines";

export default async function Page() {
  return (
    <Container maxWidth="lg">
      <Suspense fallback={<div>Loading Headlines ....</div>}>
        <Headlines />
      </Suspense>
    </Container>
  );
}
