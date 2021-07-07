import React, { useState, useEffect } from 'react';
import { Grid, IconButton, InputBase } from '@material-ui/core';
import { Search, Cancel, Clear } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  searchContainer: {
    marginTop: 5,
    // justifyContent: 'space-between',
    border: `1px solid ${grey[400]}`,
    borderRadius: 30,
  },
  input: {},
  icon: {
    color: grey[600],
  },
  iconWrapper: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const Searchbar: React.FC = () => {
  const classes = useStyles();

  const [searchInput, setSearchInput] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value);

  const handleClear = () => {
    setSearchInput('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit', searchInput);
  };

  return (
    <div className={classes.searchContainer}>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center">
          <Grid item xs={1}>
            <IconButton
              // onClick={handleSubmit}
              type="submit"
              className={classes.iconWrapper}
            >
              <Search className={classes.icon} />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <InputBase
              fullWidth
              type="text"
              value={searchInput}
              placeholder="Search by keyword"
              onChange={handleInput}
              className={classes.input}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={handleClear} className={classes.iconWrapper}>
              <Cancel className={classes.icon} />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Searchbar;
