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
import {
  fetchCurrentGroupUsers,
  selectCurrentGroup,
  setCurrentGroup,
} from "./features/group/groupSlice";
import {
  fetchCurrentUser,
  initialState,
  selectCurrentUser,
  setCurrentUser,
} from "./features/user/userSlice";
import cognitoConfig from "./settings/auth-settings";
import { useStyles } from "./settings/themes";
import { fetchCategories } from "./features/categories/categoriesSlice";
import { isEqual } from "./utils";
import GroupController from "./features/group/controller";

Amplify.configure(cognitoConfig);

const Feedback = React.memo((): JSX.Element => {
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
}, isEqual);

const ApplicationContents = React.memo((): JSX.Element | null => {
  const classes = useStyles();
  return (
    <div className={classes.root} id="_App_">
      <Router>
        <Header />
      </Router>
      <GroupController />
      <Feedback />
    </div>
  );
}, isEqual);

const AppWithAuth = (): JSX.Element => {
  // console.log("*** AppWithAuth");
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentGroup = useSelector(selectCurrentGroup);
  useEffect(
    () =>
      onAuthUIStateChange(nextAuthState => {
        // console.log("*** onAuthUIStateChange");
        dispatch(setAuthState(nextAuthState));
        if (nextAuthState === AuthState.SignedIn) {
          // console.log("--- fetchCurrentUser");
          dispatch(fetchCurrentUser());
        } else {
          // console.log("--- setCurrentUser to initial");
          dispatch(setCurrentUser(initialState));
        }
      }),
    [],
  );

  useEffect(() => {
    // console.log("top", currentUser);
    if (currentUser && currentUser.groups) {
      dispatch(setCurrentGroup(currentUser.groups[0] || { id: "", name: "" }));
    }
  }, [currentUser.id]);

  useEffect(() => {
    // console.log('top', currentUser)
    if (currentGroup && currentGroup.id) {
      const { id } = currentGroup;
      dispatch(fetchCategories(id));
      dispatch(fetchCurrentGroupUsers(id));
    }
  }, [currentGroup.id]);

  return <ApplicationContents />;
};

export default AppWithAuth;
