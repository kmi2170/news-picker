import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import Searchbar from './Searchbar';
import ButtonsLanguage from './Buttons/ButtonsLanguage';
import ButtonsTopic from './Buttons/ButtonsTopic';
import Favorites from './Buttons/Favorites';
import AdvanceSearch from './AdvanceSearch';

import { useAppDispatch } from '../../app/hooks';
import { reset } from '../../features/newsSlice';

const useStyles = makeStyles(() => ({
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

const Navbar = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isOpenAO, setIsOpenAO] = useState<boolean>(false);

  const handleExpandClick = () => {
    setIsOpen(prev => !prev);
    setIsOpenAO(false);
  };

  const handleExpandClickAO = () => {
    setIsOpenAO(prev => !prev);
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
              <Grid item xs={6}>
                <ButtonsLanguage />
              </Grid>
              <Grid item xs={6}>
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
              <ButtonsTopic />
            </Grid>
            <Grid item xs={12}>
              <div style={{ marginTop: '0.5rem' }}>
                <Favorites />
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
          <AdvanceSearch />
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Navbar;
