import React from "react";
import { ISnackBarBase, SnackBar } from ".";

interface ISnackBarState extends ISnackBarBase {
  onClose: () => void;
}
interface ISimpleSnackBar {
  snackbar: ISnackBarState | null;
}

export const SimpleSnackBar = ({
  snackbar,
}: ISimpleSnackBar): JSX.Element | null =>
  snackbar && (
    <SnackBar
      open
      message={snackbar.message}
      severity={snackbar.severity}
      closable
      autoHideDuration={snackbar.autoHideDuration}
      handleClose={snackbar.onClose}
    />
  );
export default SimpleSnackBar;
