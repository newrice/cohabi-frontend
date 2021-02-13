import React, { useCallback } from "react";
import { DatePicker } from "../../../component/parts";
import { isEqual } from "../../../utils";

interface IFieldDate {
  value: string;
  onChange: (value: Date | null) => void;
}
const formFieldCommonClass = "input-field-base";

// eslint-disable-next-line import/prefer-default-export
export const FieldDate = React.memo(
  ({ value, onChange }: IFieldDate): JSX.Element => {
    console.log("*** FieldDate", value);
    const handleDateChange = useCallback((d: Date | null) => {
      onChange(d);
    }, []);

    return (
      <DatePicker
        value={value}
        onChange={handleDateChange}
        format="yyyy/MM/dd"
        disableFuture
        className={formFieldCommonClass}
      />
    );
  },
  isEqual,
);

export default FieldDate;
