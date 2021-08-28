import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: "0.5rem 0",
  },
  Input: {
    color: theme.palette.common.white,
  },
  InputLabel: {
    color: theme.palette.primary.light,
  },
  notchedOutline: {
    borderColor: theme.palette.primary.light,
    "&:hover": {
      borderColor: theme.palette.common.white,
    },
  },
}));

const DatePicker: React.FC<DatePickerProps> = ({ date, setDate }) => {
  const classes = useStyles();

  const handelSetDate = (date: Date | null) => {
    if (date) setDate(date);
    else setDate(new Date(Date.now()));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Date"
        format="MM/dd/yyyy"
        value={new Date(date)}
        disableFuture
        inputVariant="outlined"
        fullWidth
        onChange={handelSetDate}
        InputProps={{
          classes: {
            root: classes.Input,
            notchedOutline: classes.notchedOutline,
          },
        }}
        InputLabelProps={{
          classes: {
            root: classes.InputLabel,
          },
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        DialogProps={{
          color: "black",
        }}
        showTodayButton
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
interface DatePickerProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}
