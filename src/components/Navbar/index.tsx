import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import makeStyles from "@mui/styles/makeStyles";

import Searchbar from "./Searchbar";
import ButtonsLanguage from "./Buttons/ButtonsLanguage";
import ButtonsTopic from "./Buttons/ButtonsTopic";
import Favorites from "./Buttons/Favorites";
import AdvanceSearch from "./AdvanceSearch";

import { useAppDispatch } from "../../store/hooks";
import { reset } from "../../slice/newsSlice";

const useStyles = makeStyles(() => ({
  appBar: {
    background: "white",
  },
  text: {
    fontFamily: "Tourney",
    fontWeight: 500,
    color: "black",
  },
  icon: {
    color: grey[600],
  },
  expand: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0.3rem",
  },

  resetButton: {
    borderRadius: "15px",
    textTransform: "capitalize",
    marginLeft: "4rem",
  },
  optionButton: {
    padding: 3,
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isOpenAO, setIsOpenAO] = useState<boolean>(false);

  const handleExpandClick = () => {
    setIsOpen((prev) => !prev);
    setIsOpenAO(false);
  };

  const handleExpandClickAO = () => {
    setIsOpenAO((prev) => !prev);
  };

  const handleReset = () => dispatch(reset());

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar variant="dense">
        <Grid container alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h4" component="h1" className={classes.text}>
              News Picker
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8} md={7}>
            <Searchbar />
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Toolbar>
      <div className={classes.expand}>
        <Tooltip title={isOpen ? "Close Options" : "Open Options"}>
          <IconButton
            aria-label="basic options"
            className={classes.optionButton}
            onClick={handleExpandClick}
            size="large"
          >
            {isOpen ? (
              <ExpandLess className={classes.icon} />
            ) : (
              <ExpandMore className={classes.icon} />
            )}
          </IconButton>
        </Tooltip>
      </div>
      <div data-testid="basic-options" hidden={!isOpen}>
        <Toolbar>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={12} container>
              <Grid item xs={6}>
                <ButtonsLanguage />
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Reset Keywords,  Date...">
                  <Button
                    variant="contained"
                    size="small"
                    className={classes.resetButton}
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ButtonsTopic />
            </Grid>
            <Grid item xs={12}>
              <div style={{ marginTop: "0.5rem" }}>
                <Favorites />
              </div>
            </Grid>
          </Grid>
        </Toolbar>

        <div className={classes.expand}>
          <Tooltip
            title={isOpenAO ? "Close Advance Options" : "Advance Options"}
          >
            <IconButton
              aria-label="advance options"
              className={classes.optionButton}
              onClick={handleExpandClickAO}
              size="large"
            >
              {isOpenAO && isOpen ? (
                <ExpandLess className={classes.icon} />
              ) : (
                <ExpandMore className={classes.icon} />
              )}
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div data-testid="advance-options" hidden={!isOpenAO}>
        <Toolbar>
          <AdvanceSearch />
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Navbar;
