import React from "react";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";
import { IconButton, Snackbar, SnackbarProps } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export interface ISnackBarBase extends SnackbarProps {
  message: string;
  severity: Color;
  closable: boolean;
}

export interface ISnackBar extends ISnackBarBase {
  open: boolean;
  handleClose: () => void;
}

const Alert = ({ action, children, severity }: AlertProps) => (
  <MuiAlert elevation={6} variant="filled" action={action} severity={severity}>
    {children}
  </MuiAlert>
);

export const SnackBar = ({
  open,
  message,
  severity,
  autoHideDuration,
  closable,
  handleClose,
}: ISnackBar): JSX.Element => {
  const onClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    handleClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert
        severity={severity}
        action={
          closable ? (
            <IconButton color="inherit" size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          ) : null
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
