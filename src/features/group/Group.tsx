/* eslint @typescript-eslint/no-explicit-any:0 */
import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { initialState, selectCurrentGroup } from "./groupSlice";

interface IAuthPage {
  children?: React.ReactNode;
}

const WithGroup = ({ children }: IAuthPage): JSX.Element => {
  const currentGroup = useSelector(selectCurrentGroup);
  return _.isEqual(currentGroup, initialState.currentGroup) ? (
    <p>Getting Group Info</p>
  ) : (
    <>{children}</>
  );
};

WithGroup.defaultProps = {
  children: null,
};

export default WithGroup;
