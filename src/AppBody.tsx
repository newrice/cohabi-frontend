import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Amplify from "aws-amplify";
import { onAuthUIStateChange, AuthState } from "@aws-amplify/ui-components";
import Router from "./Route";
import Header from "./component/header";
import { SimpleCircuration, SimpleSnackBar } from "./component/parts";
import { setAuthState } from "./features/auth/authSlice";
import {
  closeSnack,
  selectProgress,
  selectSnackState,
} from "./features/feedback/feedbackSlice";
import { setCurrentGroup } from "./features/group/groupSlice";
import {
  fetchCurrentUser,
  initialState,
  selectCurrentUser,
  setCurrentUser,
} from "./features/user/userSlice";
import cognitoConfig from "./settings/auth-settings";
import { useStyles } from "./settings/themes";

Amplify.configure(cognitoConfig);

const Feedback = (): JSX.Element => {
  const dispatch = useDispatch();
  const progress = useSelector(selectProgress);
  const snackstate = useSelector(selectSnackState);
  function onClose() {
    dispatch(closeSnack());
  }
  const snackbar = snackstate ? { ...snackstate, onClose } : null;
  return (
    <>
      <SimpleCircuration open={progress} />
      <SimpleSnackBar snackbar={snackbar} />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ApplicationContents = (): JSX.Element | null => {
  const classes = useStyles();
  return (
    <div className={classes.root} id="_App_">
      <Router>
        <Header />
      </Router>
      <Feedback />
    </div>
  );
};

const AppWithAuth = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  useEffect(
    () =>
      onAuthUIStateChange(nextAuthState => {
        // console.log('onAuthUIStateChange called', nextAuthState, authData)
        dispatch(setAuthState(nextAuthState));
        if (nextAuthState === AuthState.SignedIn) {
          dispatch(fetchCurrentUser());
        } else {
          dispatch(setCurrentUser(initialState));
        }
      }),
    [dispatch],
  );

  useEffect(() => {
    // console.log('top', currentUser)
    if (currentUser && currentUser.groups) {
      dispatch(setCurrentGroup(currentUser.groups[0] || { id: "", name: "" }));
    }
  }, [currentUser, dispatch]);

  return <ApplicationContents />;
};

export default AppWithAuth;
