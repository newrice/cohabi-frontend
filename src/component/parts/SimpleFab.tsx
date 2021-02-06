import { Fab } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import React, { ReactElement, MouseEvent } from "react";

interface SimpleFabProps {
  disabled?: boolean;
  icon: ReactElement;
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  testid?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

// eslint-disable-next-line import/prefer-default-export
export const SimpleFab = ({
  icon,
  disabled,
  handleClick,
  testid,
}: SimpleFabProps): JSX.Element => {
  const classes = useStyles();
  const props = {
    "data-testid": testid,
  };
  return (
    <Fab
      className={classes.fab}
      color="secondary"
      role="button"
      disabled={disabled}
      onClick={handleClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {icon}
    </Fab>
  );
};

SimpleFab.defaultProps = {
  disabled: false,
  testid: undefined,
};
