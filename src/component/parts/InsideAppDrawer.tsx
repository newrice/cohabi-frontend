import React from "react";
import { Drawer, DrawerProps } from "@material-ui/core";

interface IInsideAppDrawer extends DrawerProps {
  containerId?: string;
}

// eslint-disable-next-line import/prefer-default-export
export const InsideAppDrawer = ({
  containerId,
  children,
  ...rest
}: IInsideAppDrawer): JSX.Element => (
  <Drawer
    ModalProps={{
      container: () => document.getElementById(containerId || "_App_"),
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  >
    {children}
  </Drawer>
);

InsideAppDrawer.defaultProps = {
  containerId: undefined,
};
