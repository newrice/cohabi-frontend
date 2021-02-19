import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListCostController from "./list/Controller";
import NewCostPage from "./new/NewCostPage";
import { setProgress, setSnackState } from "../feedback/feedbackSlice";
import {
  selectCurrentGroup,
  selectCurrentGroupUser,
} from "../group/groupSlice";
import { selectCurrentUser } from "../user/userSlice";
import { TCostsQueryParam } from "../../types";
import { createSnackState } from "../../utils";
import { selectCategories } from "../categories/categoriesSlice";
// FIXME: remove
// import { categoriesData, usersData } from "../../__mock__/data";

const CostsController = ({ id }: TCostsQueryParam): JSX.Element => {
  const dispatch = useDispatch();
  const currentGroup = useSelector(selectCurrentGroup);
  const currentUser = useSelector(selectCurrentUser);
  const categories = useSelector(selectCategories);
  const users = useSelector(selectCurrentGroupUser);

  const handleRequestStart = useCallback(() => {
    dispatch(setProgress(true));
  }, []);
  const handleRequestEnd = useCallback((error: boolean, message: string) => {
    dispatch(setProgress(false));
    dispatch(setSnackState(createSnackState(error, message)));
  }, []);

  const props = {
    currentGroupId: currentGroup.id,
    currentUserId: currentUser.id,
    users,
    categories,
    onRequestStart: handleRequestStart,
    onRequestEnd: handleRequestEnd,
  };

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {id === "new" && <NewCostPage {...props} />}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {!id && <ListCostController {...props} />}
    </>
  );
};

export default CostsController;
