import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMe } from "../../api";
import { RootState } from "../../app/rootReducer";
import { AppThunk } from "../../app/store";
import { isApiError } from "../../utils";

interface IGroup {
  id: string;
  name: string;
}

export interface ICurrentUser {
  email: string;
  id: string;
  name: string;
  avatar?: string;
  groups: IGroup[];
}

export const initialState: ICurrentUser = {
  email: "",
  id: "",
  name: "",
  avatar: "",
  groups: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: initialState,
  },
  reducers: {
    setCurrentUser: (state, action: PayloadAction<ICurrentUser>) => {
      // eslint-disable-next-line no-param-reassign
      state.currentUser = action.payload;
    },
    setCurrentUserGroup: (state, action: PayloadAction<IGroup[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.currentUser.groups = action.payload;
    },
  },
});

export const { setCurrentUser, setCurrentUserGroup } = userSlice.actions;

export const selectCurrentUser = (state: RootState): ICurrentUser =>
  state.user.currentUser;

export default userSlice.reducer;

export const fetchCurrentUser = (): AppThunk => async dispatch => {
  try {
    const repoDetails = await fetchMe();
    const { error } = isApiError(repoDetails, true);
    if (!error) {
      dispatch(setCurrentUser(repoDetails.body as ICurrentUser));
    } else {
      dispatch(setCurrentUser(initialState));
    }
  } catch (err) {
    // console.log(err)
  }
};
