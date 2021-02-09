import React from "react";
import { ISnackBarBase, SnackBar } from "../parts";

interface ISnackBarState extends ISnackBarBase {
  onClose: () => void;
}
interface IBasicSnackBar {
  snackbar: ISnackBarState | null;
}

const BasicSnackBar = ({ snackbar }: IBasicSnackBar): JSX.Element | null =>
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
export default BasicSnackBar;
