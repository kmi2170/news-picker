import { Suspense } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HeadlinesCategoryButtons from "../../components/headlines/category-buttons";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="lg">
      <Typography
        component="h2"
        variant="h4"
        sx={{ mt: "1rem", mb: "1rem", fontWeight: "bold" }}
      >
        Headlines
      </Typography>
      <Suspense>
        <HeadlinesCategoryButtons />
      </Suspense>
      {children}
    </Container>
  );
}
