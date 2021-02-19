import React from "react";
import { useDispatch } from "react-redux";
import { IApiResponseBase } from "../../types";
import { createSnackState, isApiError } from "../../utils";
import { GroupDrawer } from "./view/GroupDrawer";
import { setProgress, setSnackState } from "../feedback/feedbackSlice";

const Controller = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleRequestStart = () => {
    dispatch(setProgress(true));
  };
  const handleRequestEnd = (response?: IApiResponseBase<void>) => {
    const { error, message } = isApiError(response, false);
    dispatch(setProgress(false));
    dispatch(setSnackState(createSnackState(error, message)));
  };

  return (
    <>
      <GroupDrawer
        onRequestStart={handleRequestStart}
        onRequestEnd={handleRequestEnd}
      />
    </>
  );
};

export default Controller;
