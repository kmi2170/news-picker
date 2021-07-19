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
import AdvanceSearch from './AdvanceSearch';

import { TopicType } from '../../api/type_settngs';

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
    margin: '0.3rem',
  },

  resetButton: {
    borderRadius: '15px',
    textTransform: 'capitalize',
    marginLeft: '4rem',
  },
}));

interface NavbarProps extends ButtonsLanguageProp {
  topic: TopicType;
  setTopic: (topic: TopicType) => void;
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  setCookieFunc: (name: string, value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  topic,
  setTopic,
  setIsLoading,
  favorites,
  setFavorites,
  setCookieFunc,
}) => {
  const classes = useStyles();
  const { query } = useRouter();

  const [searchInput, setSearchInput] = useState<string>('');

  const [sources, setSources] = useState<string | null>(null);

  const initDateFrom = new Date();
  initDateFrom.setDate(initDateFrom.getDate() - 7);
  const [dateFrom, setDateFrom] = useState<Date | null>(initDateFrom);
  const [dateTo, setDateTo] = useState<Date | null>(new Date());

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isOpenAO, setIsOpenAO] = useState<boolean>(false);

  const handleExpandClick = () => {
    setIsOpen((prev) => !prev);
    setIsOpenAO(false);
  };

  const handleExpandClickAO = () => {
    setIsOpenAO((prev) => !prev);
  };

  const handleReset = () => {
    setTopic(null);
    setSources(null);
    setDateFrom(initDateFrom);
    setDateTo(new Date());
    setSearchInput('');

    router.push({
      pathname: '/',
      query: { q: 'news', lang },
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
            <Searchbar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Toolbar>
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

      <div hidden={!isOpen}>
        <Toolbar>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={12} container>
              <Grid xs={6}>
                <ButtonsLanguage
                  lang={lang}
                  setLang={setLang}
                  setIsLoading={setIsLoading}
                  setCookieFunc={setCookieFunc}
                />
              </Grid>
              <Grid xs={6}>
                <Tooltip title="Reset Keywords, Topic, Date...">
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
              <ButtonsTopic
                lang={lang}
                // setLang={setLang}
                topic={topic}
                setTopic={setTopic}
                setIsLoading={setIsLoading}
                setCookieFunc={setCookieFunc}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ marginTop: '0.5rem' }}>
                <Favorites
                  favorites={favorites}
                  setFavorites={setFavorites}
                  setCookieFunc={setCookieFunc}
                />
              </div>
            </Grid>
          </Grid>
        </Toolbar>

        <div className={classes.expand}>
          <Tooltip
            title={isOpenAO ? 'Close More Options' : 'Open More Options'}
          >
            <ButtonBase onClick={handleExpandClickAO}>
              {isOpenAO && isOpen ? (
                <ExpandLess className={classes.icon} />
              ) : (
                <ExpandMore className={classes.icon} />
              )}
            </ButtonBase>
          </Tooltip>
        </div>
      </div>

      <div hidden={!isOpenAO}>
        <Toolbar>
          <AdvanceSearch
            lang={lang}
            sources={sources}
            setSources={setSources}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Navbar;
