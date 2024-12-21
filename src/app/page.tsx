import { Suspense } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Headlines from "../components/headlines";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    page?: Promise<string>;
  };
}) {
  const page = Number((await searchParams).page) || 1;

  return (
    <Container maxWidth="lg">
      <Typography
        component="h2"
        variant="h4"
        sx={{ mt: "1rem", mb: "1rem", fontWeight: "bold" }}
      >
        Headlines
      </Typography>

      <Suspense fallback={<div>Loading Headlines ....</div>}>
        <Headlines page={page} />
      </Suspense>
    </Container>
  );
}
