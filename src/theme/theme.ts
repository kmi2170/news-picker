import { createTheme } from '@material-ui/core/styles';
// import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { responsiveFontSizes } from '@material-ui/core/styles';

import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { red } from '@material-ui/core/colors';

const breakpoints = createBreakpoints({});

// breakpoints.values.lg = 1024
// breakpoints.values['xxl'] = 3000
// '@media (min-width:600px)': {
//     fontSize: '1.5rem',
//   },

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#F53689',
      // main: '#19857b',
    },
    info: {
      main: '#2196f3',
      light: '#2196f3',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Roboto Condensed',
      // "Raleway",
      'sans-serif',
      'Tourney',
    ].join(','),
  },
  overrides: {},
});

theme = responsiveFontSizes(theme);

export default theme;
