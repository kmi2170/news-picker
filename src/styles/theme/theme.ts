"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#F53689",
      // main: '#19857b',
    },
    info: {
      main: "#2196f3",
      light: "#2196f3",
    },
    // error: {
    //   main: red.A400,
    // },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
