import { memo } from 'react';
import Grid from '@material-ui/core/Grid';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  setPickerDateFrom,
  setPickerDateTo,
} from '../../../features/newsSlice';

const DateFromTo = () => {
  const pickerDateFrom = useAppSelector((state) => state.news.pickerDateFrom);
  const pickerDateTo = useAppSelector((state) => state.news.pickerDateTo);
  const dispatch = useAppDispatch();

  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);

  const handleDateFromChange = (date: Date) => {
    dispatch(setPickerDateFrom(date));
  };

  const handleDateToChange = (date: Date) => {
    dispatch(setPickerDateTo(date));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Grid item xs={6}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="none"
            id="date-picker-from"
            label="Date From"
            value={pickerDateFrom}
            onChange={handleDateFromChange}
            KeyboardButtonProps={{
              'aria-label': 'date from',
            }}
            disableFuture
            minDate={minDate}
            maxDate={pickerDateTo}
          />
        </Grid>
        <Grid item xs={6}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="none"
            id="date-picker-to"
            label="Date To"
            value={pickerDateTo}
            onChange={handleDateToChange}
            KeyboardButtonProps={{
              'aria-label': 'date to',
            }}
            disableFuture
            minDate={minDate}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default memo(DateFromTo);
