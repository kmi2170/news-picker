import { useState, useEffect, useCallback } from "react";

import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectNews,
  setFrom,
  setTo,
  setTopic,
  setSources,
  setSearchSources,
} from "../../features/newsSlice";

import DateFromTo from "./DateFromTo";
import { localToUTCString } from "../../utils/localToUTCString";

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  button: {
    borderRadius: "15px",
    textTransform: "capitalize",
    // marginTop: '0.5rem',
    marginTop: 0,
    marginBottom: "1.0rem",
    color: "#fff",
    background: teal[500],
  },
}));

const AdvanceSearch: React.FC = () => {
  const classes = useStyles();

  const { searchSources } = useAppSelector(selectNews);
  const dispatch = useAppDispatch();

  // const [newsSources, setNewsSources] = useState<string>("");

  const initDateFrom = new Date();
  initDateFrom.setDate(initDateFrom.getDate() - 7);

  const [dateFrom, setDateFrom] = useState<Date | null>(new Date(initDateFrom));
  const [dateTo, setDateTo] = useState<Date | null>(new Date());

  console.log(`dateFrom`, dateFrom, typeof dateFrom);
  console.log(`dateTo`, dateTo);

  useEffect(() => {
    dispatch(setFrom(localToUTCString(dateFrom)));
    dispatch(setTo(localToUTCString(dateTo)));
  }, []);

  // useEffect(() => {
  //   if (isReset) {
  //     dispatch(setFrom(localToUTCString(dateFrom)));
  //     dispatch(setTo(localToUTCString(dateTo)));
  //   }
  // }, [isReset]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(setTopic(""));
    dispatch(setFrom(localToUTCString(dateFrom)));
    dispatch(setTo(localToUTCString(dateTo)));
    dispatch(setSources(searchSources));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchSources(e.target.value));

  // const handleChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => setNewsSources(e.target.value),
  //   []
  // );

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
              placeholder="e.g. nytimes.com"
              margin="none"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={searchSources}
              onChange={handleChange}
              // className={classes.input}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateFromTo
              // dateFrom={dateFrom}
              // setDateFrom={setDateFrom}
              // dateTo={dateTo}
              // setDateTo={setDateTo}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              className={classes.button}
            >
              Apply This Options
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AdvanceSearch;
