import { useState, useEffect } from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const DateFromTo: React.FC = () => {
  const classes = useStyles();

  const [dateFrom, setDateFrom] = useState<Date | null>(new Date());
  const [dateTo, setDateTo] = useState<Date | null>(new Date());

  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);

  const handleDateFromChange = (date: Date | null) => {
    setDateFrom(date);
    setDateTo(date);
    console.log('data from', date);
  };

  const handleDateToChange = (date: Date | null) => {
    setDateTo(date);
    console.log('data to', date);
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-from"
            label="Date From"
            value={dateFrom}
            onChange={handleDateFromChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            disableFuture
            minDate={minDate}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-to"
            label="Date To"
            value={dateTo}
            onChange={handleDateToChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            disableFuture
            minDate={minDate}
            maxDate={dateFrom}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DateFromTo;
