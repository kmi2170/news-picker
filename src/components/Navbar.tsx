import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  AppBar,
  Toolbar,
  TextField,
  IconButton,
  ButtonBase,
  Tooltip,
} from '@material-ui/core';
import {
  ExpandMore,
  ExpandLess,
  Search,
  Cancel,
  Clear,
} from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

import ButtonsLanguage, {
  ButtonsLanguageProp,
} from '../components/ButtonsLanguage';
import ButtonsCategory from '../components/ButtonsCategory';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    background: 'white',
  },
  text: {
    fontFamily: 'Tourney',
    fontWeight: 500,
    color: 'black',
  },
  wrapperSearch: {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${grey[400]}`,
    borderRadius: 30,
  },
  icon: {
    color: grey[600],
  },
  expand: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const Navbar: React.FC<ButtonsLanguageProp> = ({
  setLang,
  defaultLang,
  setIsLoading,
}) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');

  const handleExpandClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value);

  const handleSearchInputClear = (e) => {
    setSearchInput('');
    // e.target.value = '';
  };

  const handleSearchInputSubmit = () => {
    console.log('submit');
  };

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
            <div className={classes.wrapperSearch}>
              <IconButton onClick={handleSearchInputSubmit}>
                <Search
                  className={classes.icon}
                  // onClick={handleSearchInputSubmit}
                />
              </IconButton>
              <TextField
                fullWidth
                type="text"
                variant="standard"
                size="small"
                value={searchInput}
                placeholder="Search by keyword"
                // value={handleSearchInput}
                onChange={handleSearchInput}
              />
              <IconButton onClick={handleSearchInputClear}>
                <Cancel className={classes.icon} />
              </IconButton>
            </div>
            <div className={classes.expand}>
              <Tooltip title={isOpen ? 'Close Panel' : 'Open Panel'}>
                <ButtonBase onClick={handleExpandClick}>
                  {isOpen ? (
                    <ExpandLess className={classes.icon} />
                  ) : (
                    <ExpandMore className={classes.icon} />
                  )}
                </ButtonBase>
              </Tooltip>
            </div>
          </Grid>

          <Grid item md={2} />
        </Grid>
      </Toolbar>

      <div hidden={!isOpen}>
        <Toolbar>
          <ButtonsLanguage
            setLang={setLang}
            defaultLang={defaultLang}
            setIsLoading={setIsLoading}
          />
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Navbar;
