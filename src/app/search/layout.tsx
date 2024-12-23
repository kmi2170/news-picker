import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import SearchNews from "../../components/search/search-news";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="xl">
      <Typography
        component="h2"
        variant="h4"
        sx={{ mt: "1rem", mb: "1rem", fontWeight: "bold" }}
      >
        Search News by Keyword
      </Typography>
      <SearchNews />
      {children}
    </Container>
  );
}
