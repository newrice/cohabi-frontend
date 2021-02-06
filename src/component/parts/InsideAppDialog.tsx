import React from "react";
import { Dialog, DialogProps } from "@material-ui/core";

interface IInsideAppDialog extends DialogProps {
  containerId?: string;
}

// eslint-disable-next-line import/prefer-default-export
export const InsideAppDialog = ({
  containerId,
  children,
  ...rest
}: IInsideAppDialog): JSX.Element => (
  <Dialog
    container={() => document.getElementById(containerId || "_App_")}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  >
    {children}
  </Dialog>
);

InsideAppDialog.defaultProps = {
  containerId: undefined,
};
