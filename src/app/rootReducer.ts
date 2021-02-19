import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import categoriesSlice from "../features/categories/categoriesSlice";
import feedbackSlice from "../features/feedback/feedbackSlice";
import groupSlice from "../features/group/groupSlice";
import i18nSlice from "../features/i18n/i18nSlice";
import userSlice from "../features/user/userSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  categories: categoriesSlice,
  feedback: feedbackSlice,
  group: groupSlice,
  i18n: i18nSlice,
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
