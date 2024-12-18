import { Metadata } from "next";

import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import theme from "../styles/theme/theme";
import Footer from "../components/Footer";

import "../styles/global.css";

export const metadata: Metadata = {
  title: "News Picker",
  description:
    "Next.js project, with Typescript and MUI; News top headlines by category and language, search news by keyword",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <Container maxWidth="xl" sx={{ minHeight: "96vh" }}>
              {children}
            </Container>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
