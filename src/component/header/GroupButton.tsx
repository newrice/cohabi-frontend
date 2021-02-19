import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "@aws-amplify/ui-components";
import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import { selectAuthState } from "../../features/auth/authSlice";
import { setIsGroupDialogOpen } from "../../features/group/groupSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    userButton: {
      marginLeft: theme.spacing(1),
    },
  }),
);

// eslint-disable-next-line import/prefer-default-export
export const GroupMenu = (): JSX.Element => {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  const classes = useStyles();

  const handleClickOpen = () => {
    dispatch(setIsGroupDialogOpen(true));
  };

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        disabled={authState !== AuthState.SignedIn}
        className={classes.userButton}
        onClick={handleClickOpen}
      >
        <GroupIcon />
      </IconButton>
    </>
  );
};
