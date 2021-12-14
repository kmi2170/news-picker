import { Grid, Button, Typography, Chip, Tooltip } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectNews, setQ, setFavorites } from "../../features/newsSlice";

const useStyles = makeStyles((theme: Theme) => ({
  text: { color: "black" },
  button: {
    borderRadius: "15px",
    textTransform: "capitalize",
    color: "#fff",
    background: purple[500],
    // color: theme.palette.info.dark,
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

const Favorite: React.FC = () => {
  const classes = useStyles();

  const { q, favorites } = useAppSelector(selectNews);
  const dispatch = useAppDispatch();

  const addFavorite = () => {
    if (q) {
      const newFavorites = [...favorites, q];
      dispatch(setFavorites(newFavorites));
    }
  };

  const handleClick = () => dispatch(setQ(q));

  const handleDelete = (q: string) => {
    const res = confirm(`Delete this query, ${q}?`);

    if (res) {
      const newFavorites = favorites.filter((favorite) => favorite !== q);
      setFavorites(newFavorites);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={3}>
        <Tooltip title="Register the keywords (cookie required)">
          <Button
            variant="contained"
            // color="default"
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
              onClick={handleClick}
              onDelete={() => handleDelete(favorite)}
            />
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default Favorite;
