import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";

interface II18n {
  locale: string;
}

const initialState: II18n = {
  locale: "ja",
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = i18nSlice.actions;

export const selectLocale = (state: RootState): string => state.i18n.locale;

export default i18nSlice.reducer;
