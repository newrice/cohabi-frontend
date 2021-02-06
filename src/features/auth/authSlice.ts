import { AuthState } from "@aws-amplify/ui-components";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";
import { baseUserData } from "./converter";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authState: "",
    userData: baseUserData,
  },
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      // eslint-disable-next-line no-param-reassign
      state.authState = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;
// eslint-disable-next-line
export const selectAuthState = (state: RootState) => state.auth.authState;

export default authSlice.reducer;
