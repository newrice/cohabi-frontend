import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  SelectProps,
} from "@material-ui/core";
import clsx from "clsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTestId = (testId: string, suffix: string | number): any => ({
  "data-testid": `${testId}-${suffix}`,
});
interface ILabeledSelect extends SelectProps {
  label: string;
  className?: string;
  labelClass?: string;
  selectClass?: string;
  value: unknown;
  children: React.ReactNode;
  testid?: string;
}
const LabeledSelectClass = "parts-labeled-class";
// eslint-disable-next-line import/prefer-default-export
export const LabeledSelect = ({
  label,
  className,
  labelClass,
  selectClass,
  value,
  children,
  testid,
  id,
  ...rest
}: ILabeledSelect): JSX.Element => (
  <FormControl
    className={clsx(LabeledSelectClass, className)}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...{ "data-testid": "wrapped-labeled-select" }}
  >
    <InputLabel
      htmlFor={id || "labeled-select-label"}
      className={labelClass}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...{ "data-testid": "wrapped-labeled-select-label" }}
    >
      {label}
    </InputLabel>
    <Select
      id={id || "labeled-select-label"}
      value={value}
      className={selectClass}
      inputProps={{ ...getTestId(testid || "", "input") }}
      SelectDisplayProps={{ ...getTestId(testid || "", "label") }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Select>
  </FormControl>
);

LabeledSelect.defaultProps = {
  className: undefined,
  labelClass: undefined,
  selectClass: undefined,
  testid: undefined,
};
