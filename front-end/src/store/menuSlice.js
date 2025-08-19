import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name:"sidebar",
    initialState:false,
    reducers:{
        openSideBar : (state)=>{
            return !state
        }
    }
})

export const {openSideBar} = menuSlice.actions;
export default menuSlice.reducer
