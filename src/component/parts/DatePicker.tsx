import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  DatePicker as MuiDatePicker,
  DatePickerProps,
} from "@material-ui/pickers";
import clsx from "clsx";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface IDatePicker extends DatePickerProps {
  // value: Date
  onChange: (date: MaterialUiPickersDate) => void;
  className?: string;
  testid?: string;
}

const pickerClass = "parts-date-picker";

// eslint-disable-next-line import/prefer-default-export
export const DatePicker = ({
  value,
  onChange,
  className,
  inputProps,
  testid,
  ...rest
}: IDatePicker): JSX.Element => {
  const iprops = {
    "data-testid": testid,
    ...inputProps,
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <MuiDatePicker
        value={value}
        DialogProps={{
          container: () => document.getElementById("_App_"),
        }}
        onChange={onChange}
        className={clsx(pickerClass, className)}
        inputProps={iprops}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
};

DatePicker.defaultProps = {
  className: undefined,
  testid: undefined,
};
