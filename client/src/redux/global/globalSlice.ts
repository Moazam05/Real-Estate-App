import { createSlice } from "@reduxjs/toolkit";
// Custom Imports
import { RootState } from "../store";

const initialState = {
  searchText: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = globalSlice.actions;
export default globalSlice.reducer;

export const selectedSearchText = (state: RootState) => state.global.searchText;
