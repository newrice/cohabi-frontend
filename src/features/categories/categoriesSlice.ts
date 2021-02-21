import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isArray, isEmpty } from "lodash";
import { fetchCategories as fetch } from "../../api/basicApi";
import { RootState } from "../../app/rootReducer";
import { AppThunk } from "../../app/store";
import { ICategory } from "../../types";
import { isApiError } from "../../utils";
// import { categoriesData } from "../../__mock__/data";

export const initialState: ICategory[] = [];

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: initialState,
  },
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export const selectCategories = (state: RootState): ICategory[] =>
  state.categories.categories;

export default categoriesSlice.reducer;

export const fetchCategories = (
  groupId: string,
): AppThunk => async dispatch => {
  try {
    const repoDetails = await fetch(groupId);
    const { error } = isApiError(repoDetails, true);
    if (!error) {
      const { body } = repoDetails;
      if (body && !isEmpty(body) && isArray(body)) {
        dispatch(setCategories(repoDetails.body as ICategory[]));
      } else {
        dispatch(setCategories(initialState));
      }
    } else {
      dispatch(setCategories(initialState));
    }
  } catch (err) {
    // console.log(err)
  }
};
