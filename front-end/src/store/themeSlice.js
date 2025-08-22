import { createSlice } from "@reduxjs/toolkit";


const theme = localStorage.getItem("theme") || "dracula"


const themeSlice = createSlice({
    name:"theme",
    initialState:theme,
    reducers:{
        changeTheme :(state,action)=>{
            localStorage.setItem("theme",action.payload)
            state = action.payload
            return state
        }
    }
})

export const {changeTheme} = themeSlice.actions;
export default themeSlice.reducer

