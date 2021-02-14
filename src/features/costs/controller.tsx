import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isArray, isEmpty } from "lodash";
import ListCostController from "./list/Controller";
import NewCostPage from "./new/NewCostPage";
import { setProgress, setSnackState } from "../feedback/feedbackSlice";
import { selectCurrentGroup } from "../group/groupSlice";
import { selectCurrentUser } from "../user/userSlice";
import { fetchCategories, fetchUsers } from "../../api";
import { ICategory, IUser, TCostsQueryParam } from "../../types";
import { createSnackState, isApiError } from "../../utils";
// FIXME: remove
// import { categoriesData, usersData } from "../../__mock__/data";

const CostsController = ({ id }: TCostsQueryParam): JSX.Element => {
  const dispatch = useDispatch();
  const currentGroup = useSelector(selectCurrentGroup);
  const currentUser = useSelector(selectCurrentUser);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories(currentGroup.id);
      const { error } = isApiError(data, true);
      if (!error) {
        setCategories(
          data.body && !isEmpty(data.body) && isArray(data.body) // FIXME: API修正次第削除
            ? data.body
            : [],
        );
      }
      // setCategories(categoriesData);
    };
    const getUsers = async () => {
      const data = await fetchUsers(currentGroup.id);
      const { error } = isApiError(data, true);
      if (!error) {
        setUsers(
          data.body && !isEmpty(data.body) && isArray(data.body) // FIXME: API修正次第削除
            ? data.body
            : [],
        );
      }
      // setUsers(usersData);
    };
    Promise.all([getCategories(), getUsers()]).finally(() => {
      dispatch(setProgress(false));
    });
  }, [currentGroup, currentUser]);
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
