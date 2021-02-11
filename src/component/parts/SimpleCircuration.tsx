import React from "react";
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";

interface ISimpleCircuration {
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);

export const SimpleCircuration = ({
  open,
}: ISimpleCircuration): JSX.Element => {
  const classes = useStyles();
  return (
    <Backdrop open={open} className={classes.backdrop}>
      <CircularProgress color="secondary" size={80} />
    </Backdrop>
  );
};

export default SimpleCircuration;
