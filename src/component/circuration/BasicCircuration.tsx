import React from "react";
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";

interface IBasicCircuration {
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);

const BasicCircuration = ({ open }: IBasicCircuration): JSX.Element => {
  const classes = useStyles();
  return (
    <Backdrop open={open} className={classes.backdrop}>
      <CircularProgress color="secondary" size={80} />
    </Backdrop>
  );
};

export default BasicCircuration;
