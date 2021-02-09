import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";

interface ISnackState {
  message: string;
  severity: "success" | "info" | "warning" | "error";
  closable: boolean;
}

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    snackState: null as ISnackState | null,
    progress: false as boolean,
  },
  reducers: {
    setSnackState: (state, action: PayloadAction<ISnackState>) => {
      // eslint-disable-next-line no-param-reassign
      state.snackState = action.payload;
    },
    closeSnack: state => {
      // eslint-disable-next-line no-param-reassign
      state.snackState = null;
    },
    setProgress: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.progress = action.payload;
    },
  },
});

export const { setSnackState, closeSnack, setProgress } = feedbackSlice.actions;
export const selectSnackState = (state: RootState): ISnackState | null =>
  state.feedback.snackState;
export const selectProgress = (state: RootState): boolean =>
  state.feedback.progress;

export default feedbackSlice.reducer;
