"use client";

import { usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import LinkToPage from "./link";

const Links = () => {
  const pathName = usePathname();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "3rem",
      }}
    >
      <LinkToPage path="/" currentPath={pathName} name="Headlines" />
      <LinkToPage path="/search" currentPath={pathName} name="Search" />
    </Box>
  );
};

export default Links;
