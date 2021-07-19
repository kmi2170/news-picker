// import { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';

import { IconButton, InputBase } from '@material-ui/core';
import { Search, Cancel } from '@material-ui/icons';
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
    // paddingRight: '1.0rem',
    // [theme.breakpoints.down('sm')]: {
    //   paddingRight: '2.0rem',
    // },
  },
}));

interface SearchbarProps {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({
  searchInput,
  setSearchInput,
}) => {
  const classes = useStyles();
  const { query } = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value);

  const handleClear = () => {
    setSearchInput('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit', searchInput);

    router.push({
      pathname: '/',
      query: { ...query, q: searchInput },
    });
  };

  return (
    <div className={classes.searchContainer}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex' }}>
          <IconButton
            // onClick={handleSubmit}
            type="submit"
            className={classes.iconWrapper}
          >
            <Search className={classes.icon} />
          </IconButton>
          <InputBase
            fullWidth
            type="text"
            value={searchInput}
            placeholder="Search by keyword"
            onChange={handleInput}
            className={classes.input}
          />
          <IconButton onClick={handleClear} className={classes.iconWrapper}>
            <Cancel className={classes.icon} />
          </IconButton>
        </div>
        {/* 
        <Grid container alignItems="center">
          <Grid item xs={2} sm={1} md={1}>
            <IconButton
              // onClick={handleSubmit}
              type="submit"
              className={classes.iconWrapper}
            >
              <Search className={classes.icon} />
            </IconButton>
          </Grid>
          <Grid item xs={8} sm={10} md={10}>
            <InputBase
              fullWidth
              type="text"
              value={searchInput}
              placeholder="Search by keyword"
              onChange={handleInput}
              className={classes.input}
            />
          </Grid>
          <Grid item xs={2} sm={1} md={1}>
            <IconButton onClick={handleClear} className={classes.iconWrapper}>
              <Cancel className={classes.icon} />
            </IconButton>
          </Grid>
        </Grid>
      */}
      </form>
    </div>
  );
};

export default Searchbar;
