import { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';

import { Grid, Button, Typography, Chip, Tooltip } from '@material-ui/core';

import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  text: { color: 'black' },
  button: {
    borderRadius: '15px',
    textTransform: 'capitalize',
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

interface FavoriteProps {
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  setCookieFunc: (name: string, value: string) => void;
}

const Favorite: React.FC<FavoriteProps> = ({
  favorites,
  setFavorites,
  setCookieFunc,
}) => {
  const classes = useStyles();
  const { query } = useRouter();

  const addFavorite = () => {
    const newFavorites = [...favorites, query.q];
    setFavorites(newFavorites as string[]);
    setCookieFunc('favorites', JSON.stringify(newFavorites));
  };

  const handleClick = (q: string) => {
    router.push({
      pathname: '/',
      query: { ...query, q },
    });
  };

  const handleDelete = (q: string) => {
    const res = confirm(`Delete this query, ${q}?`);

    if (res) {
      const newFavorites = favorites.filter((favorite) => favorite !== q);
      setFavorites(newFavorites);
      setCookieFunc('favorites', JSON.stringify(newFavorites));
    }
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={3}>
        <Tooltip title="Register current query as your favorite!">
          <Button
            variant="outlined"
            color="default"
            onClick={addFavorite}
            className={classes.button}
          >
            Favorite!
          </Button>
        </Tooltip>
      </Grid>
      {/* 
      <Typography variant="h5" className={classes.text}>
        Favorites Queries:
      </Typography>
      */}
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

export default Favorite;
