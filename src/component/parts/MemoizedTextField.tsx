import React from "react";
import { TextField, TextFieldProps } from "@material-ui/core";
import { isEqual } from "../../utils";

export const MemoizedTextField = React.memo(
  (props: TextFieldProps): JSX.Element => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TextField {...props} />
  ),
  isEqual,
);

export default MemoizedTextField;
