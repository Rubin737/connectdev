import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "sidebar",
  initialState: true,
  reducers: {
    openSideBar: (state) => !state, 
    closeSideBar: () => true,
  },
});

export const {openSideBar,closeSideBar} = menuSlice.actions;
export default menuSlice.reducer
