import { memo } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";

import { setQ, setFavorites } from "../../../slice/newsSlice";
import { purple } from "@mui/material/colors";

const useStyles = makeStyles((theme: Theme) => ({
  text: { color: "black" },
  button: {
    borderRadius: "14px",
    textTransform: "capitalize",
    color: "#fff",
    background: purple[500],
  },
  chips: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const Favorite = () => {
  const classes = useStyles();

  const q = useAppSelector((state) => state.news.q);
  const favorites = useAppSelector((state) => state.news.favorites);
  const dispatch = useAppDispatch();

  const addFavorite = () => {
    if (q) {
      dispatch(setFavorites([...favorites, q]));
    }
  };

  const handleClick = (q: string) => {
    dispatch(setQ(q));
  };

  const handleDelete = (q: string) => {
    if (confirm(`Delete this query, ${q}?`)) {
      const newFavorites = favorites.filter((favorite) => favorite !== q);

      dispatch(setFavorites(newFavorites));
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={3}>
        <Tooltip title="Register the keywords (cookie required)">
          <Button
            aria-label="add favorite"
            variant="contained"
            onClick={addFavorite}
            className={classes.button}
          >
            Add Favorite
          </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={9}>
        <div className={classes.chips}>
          {favorites.map((favorite, i) => (
            <Chip
              key={i}
              size="small"
              label={favorite}
              onClick={() => handleClick(favorite)}
              onDelete={() => handleDelete(favorite)}
            />
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default memo(Favorite);
