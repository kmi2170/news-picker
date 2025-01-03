"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";

import Links from "./links";
import HeadlinesCategoryButtons from "../headlines/category-buttons";

const SideMenuDrawer = () => {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Links sideMenuModeOn />
      <Divider />
      {pathName !== "/search" && <HeadlinesCategoryButtons sideMenuModeOn />}
    </Box>
  );

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        sx={(theme) => ({
          color: "black",
          [theme.breakpoints.up("sm")]: {
            display: "none",
          },
        })}
      >
        <MenuIcon fontSize="large" />
      </Button>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SideMenuDrawer;
