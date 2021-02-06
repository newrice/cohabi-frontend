/* eslint @typescript-eslint/no-explicit-any:0 */
import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { initialState, selectCurrentUser } from "./userSlice";

interface IAuthPage {
  children?: React.ReactNode;
}

const WithMe = ({ children }: IAuthPage): JSX.Element => {
  const currentUser = useSelector(selectCurrentUser);
  return _.isEqual(currentUser, initialState) ? (
    <p>Getting Me Info</p>
  ) : (
    <>{children}</>
  );
};

WithMe.defaultProps = {
  children: null,
};

export default WithMe;
