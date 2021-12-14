import { Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectNews,
  setPickerDateFrom,
  setPickerDateTo,
} from "../../features/newsSlice";

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  dateContainer: {
    width: "9rem",
  },
}));

interface DateFromToProps {
  // dateFrom: Date | null;
  // setDateFrom: (date: Date | null) => void;
  // dateTo: Date | null;
  // setDateTo: (date: Date | null) => void;
}

const DateFromTo: React.FC<DateFromToProps> = (
  {
    // dateFrom,
    // setDateFrom,
    // dateTo,
    // setDateTo,
  }
) => {
  const classes = useStyles();

  const { pickerDateFrom, pickerDateTo } = useAppSelector(selectNews);
  const dispatch = useAppDispatch();

  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);

  const handleDateFromChange = (date: Date | null) => {
    dispatch(setPickerDateFrom(date));
    // setDateFrom(date);
    console.log("data from", date);
  };

  const handleDateToChange = (date: Date | null) => {
    dispatch(setPickerDateTo(date));
    // setDateTo(date);
    console.log("data to", date);
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <div className={classes.dateContainer}>
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
                  "aria-label": "change date",
                }}
                disableFuture
                minDate={minDate}
                maxDate={pickerDateTo}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.dateContainer}>
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
                  "aria-label": "change date",
                }}
                disableFuture
                minDate={minDate}
              />
            </div>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DateFromTo;
