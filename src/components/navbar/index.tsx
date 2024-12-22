import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

import Links from "./links";
import SideMenuDrawer from "./side-menu-drawer";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        p: "0.5rem 0",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <Toolbar
        component={Container}
        variant="dense"
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <SideMenuDrawer />

        <Typography
          component="h1"
          variant="h3"
          sx={{ flex: 1.5, color: "black", fontWeight: "bold" }}
        >
          News Picker
        </Typography>

        <Box sx={{ flex: 2 }}>
          <Links />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
