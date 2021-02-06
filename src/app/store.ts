import { configureStore, Action } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThunkAction } from "redux-thunk";
import RootReducer, { RootState } from "./rootReducer";

const store = configureStore({
  reducer: RootReducer,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export default store;
