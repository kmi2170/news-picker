import { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, Theme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { setQ, setFavorites } from '../../../features/newsSlice';

const useStyles = makeStyles((theme: Theme) => ({
  text: { color: 'black' },
  button: {
    borderRadius: '15px',
    textTransform: 'capitalize',
    color: '#fff',
    background: purple[500],
  },
  chips: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const Favorite = () => {
  const classes = useStyles();

  const q = useAppSelector(state => state.news.q);
  const favorites = useAppSelector(state => state.news.favorites);
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
      const newFavorites = favorites.filter(favorite => favorite !== q);

      dispatch(setFavorites(newFavorites));
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={3}>
        <Tooltip title="Register the keywords (cookie required)">
          <Button
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
