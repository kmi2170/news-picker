import { Metadata } from "next";

import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "../styles/theme/theme";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

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
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
