import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isArray, isEmpty } from "lodash";
import { fetchGroup as fetch } from "../../api";
import { RootState } from "../../app/rootReducer";
import { AppThunk } from "../../app/store";
import { IUser } from "../../types";
import { isApiError } from "../../utils";

interface ICurrentGroup {
  id: string;
  name: string;
}
interface IGroup {
  currentGroup: ICurrentGroup;
  currentGroupUsers: IUser[];
}
interface IGroupState extends IGroup {
  isGroupDialogOpen: boolean;
}
export const initialState: IGroupState = {
  currentGroup: {
    id: "",
    name: "",
  },
  currentGroupUsers: [],
  isGroupDialogOpen: false,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setCurrentGroup: (state, action: PayloadAction<ICurrentGroup>) => {
      // eslint-disable-next-line no-param-reassign
      state.currentGroup = action.payload;
    },
    setCurrentGroupUser: (state, action: PayloadAction<IUser[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.currentGroupUsers = action.payload;
    },
    setGroup: (state, action: PayloadAction<IGroup>) => {
      // eslint-disable-next-line no-param-reassign
      state.currentGroup = action.payload.currentGroup;
      // eslint-disable-next-line no-param-reassign
      state.currentGroupUsers = action.payload.currentGroupUsers;
    },
    setIsGroupDialogOpen: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.isGroupDialogOpen = action.payload;
    },
  },
});

export const {
  setGroup,
  setCurrentGroup,
  setCurrentGroupUser,
  setIsGroupDialogOpen,
} = groupSlice.actions;

export const selectCurrentGroup = (state: RootState): ICurrentGroup =>
  state.group.currentGroup;

export const selectCurrentGroupUser = (state: RootState): IUser[] =>
  state.group.currentGroupUsers;
export const selectIsGroupDialogOpen = (state: RootState): boolean =>
  state.group.isGroupDialogOpen;

export const fetchCurrentGroupUsers = (
  groupId: string,
): AppThunk => async dispatch => {
  try {
    const repoDetails = await fetch(groupId);
    const { error } = isApiError(repoDetails, true);
    if (!error) {
      const { body } = repoDetails;
      if (body && !isEmpty(body.users) && isArray(body.users)) {
        dispatch(setCurrentGroupUser(body.users as IUser[]));
      } else {
        dispatch(setCurrentGroupUser(initialState.currentGroupUsers));
      }
    } else {
      dispatch(setCurrentGroupUser(initialState.currentGroupUsers));
    }
  } catch (err) {
    // console.log(err)
  }
};
export default groupSlice.reducer;
