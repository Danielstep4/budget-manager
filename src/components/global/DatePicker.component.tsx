import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const DatePicker: React.FC<DatePickerProps> = ({ date, setDate }) => {
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
