import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";

interface ICurrentGroup {
  id: string;
  name: string;
}

interface IGroup {
  currentGroup: ICurrentGroup;
}
export const initialState: IGroup = {
  currentGroup: {
    id: "",
    name: "",
  },
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setCurrentGroup: (state, action: PayloadAction<ICurrentGroup>) => {
      // eslint-disable-next-line no-param-reassign
      state.currentGroup = action.payload;
    },
  },
});

export const { setCurrentGroup } = groupSlice.actions;

export const selectCurrentGroup = (state: RootState): ICurrentGroup =>
  state.group.currentGroup;

export default groupSlice.reducer;
