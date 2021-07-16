import React, { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';

import {
  Grid,
  Typography,
  AppBar,
  Toolbar,
  ButtonBase,
  Tooltip,
  Button,
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Searchbar from './Searchbar';
import ButtonsLanguage, { ButtonsLanguageProp } from './ButtonsLanguage';
import ButtonsTopic from './ButtonsTopic';
import Favorites from './Favorites';
import DateFromTo from './DateFromTo';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    background: 'white',
  },
  text: {
    fontFamily: 'Tourney',
    fontWeight: 500,
    color: 'black',
  },
  icon: {
    color: grey[600],
  },
  expand: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  resetButton: {
    borderRadius: '15px',
    textTransform: 'capitalize',
    marginLeft: '4rem',
  },
}));

interface NavbarProps extends ButtonsLanguageProp {
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  setCookieFunc: (name: string, value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  setIsLoading,
  favorites,
  setFavorites,
  setCookieFunc,
}) => {
  const classes = useStyles();
  const { query } = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleExpandClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleReset = () => {
    router.push({
      pathname: '/',
      query: { ...query, q: 'news' },
    });
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
            <Searchbar />

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
          <Grid container justify="flex-start" alignItems="center" spacing={1}>
            <Grid item xs={12}>
              <ButtonsLanguage
                lang={lang}
                setLang={setLang}
                setIsLoading={setIsLoading}
                setCookieFunc={setCookieFunc}
              />
              <Tooltip title="Reset Query">
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
            <Grid item xs={12}>
              <ButtonsTopic
                lang={lang}
                // setLang={setLang}
                setIsLoading={setIsLoading}
                setCookieFunc={setCookieFunc}
              />
            </Grid>
            <Grid item xs={12}>
              <Favorites
                favorites={favorites}
                setFavorites={setFavorites}
                setCookieFunc={setCookieFunc}
              />
            </Grid>
          </Grid>
          <DateFromTo />
          {/*
           */}
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Navbar;
