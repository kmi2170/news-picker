"use client";

import { usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import LinkToPage from "./link";

type LinksProps = {
  sideMenuModeOn?: boolean;
};

const Links = ({ sideMenuModeOn = false }: LinksProps) => {
  const pathName = usePathname();

  return (
    <Box
      sx={(theme) => ({
        mt: sideMenuModeOn ? "3rem" : 0,
        mb: sideMenuModeOn ? "2rem" : 0,
        display: "flex",
        [theme.breakpoints.down("sm")]: {
          display: sideMenuModeOn ? "flex" : "none",
        },
        flexDirection: sideMenuModeOn ? "column" : "row",
        justifyContent: "flex-start",
        alignItems: sideMenuModeOn ? "center" : "center",
        gap: "3rem",
      })}
    >
      <LinkToPage path="/" currentPath={pathName} name="Headlines" />
      <LinkToPage path="/search" currentPath={pathName} name="Search" />
    </Box>
  );
};

export default Links;
