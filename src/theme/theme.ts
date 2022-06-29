import { createTheme } from '@material-ui/core/styles';
import { responsiveFontSizes } from '@material-ui/core/styles';

import { red } from '@material-ui/core/colors';

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
