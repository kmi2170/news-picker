import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  selectNews,
  setFrom,
  setTo,
  setFromLocal,
  setToLocal,
  setTopic,
  setSources,
  setSearchSources,
} from '../../../features/newsSlice';

import DateFromTo from './DateFromTo';
import { localString, localToUTCString } from '../../../utils/localToUTCString';

const useStyles = makeStyles(() => ({
  text: {},
  button: {
    borderRadius: '15px',
    textTransform: 'capitalize',
    // marginTop: '0.5rem',
    marginTop: 0,
    marginBottom: '1.0rem',
    color: '#fff',
    background: teal[500],
  },
}));

const AdvanceSearch = () => {
  const classes = useStyles();

  const { searchSources, pickerDateFrom, pickerDateTo } =
    useAppSelector(selectNews);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(setTopic(''));

    dispatch(setFrom(localToUTCString(pickerDateFrom)));
    dispatch(setTo(localToUTCString(pickerDateTo)));

    dispatch(setFromLocal(localString(pickerDateFrom)));
    dispatch(setToLocal(localString(pickerDateTo)));

    dispatch(setSources(searchSources));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchSources(e.target.value));

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              label="Source"
              type="text"
              placeholder="e.g. nytimes.com, cnn.com, wsj.com"
              margin="none"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={searchSources}
              onChange={handleChange}
              // className={classes.input}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DateFromTo />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              className={classes.button}
            >
              Apply Advance Options
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AdvanceSearch;
