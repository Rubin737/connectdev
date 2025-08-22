import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:"chat",
    initialState:{
        client : null,
        channel : null,
    },
    reducers:{
        addClient : (state,action)=>{
            state.client = action.payload;
            console.log(state.client)
        },
        addChannel : (state,action)=>{
            state.channel = action.payload;
        },
    }
})
export const {addChannel,addClient} = chatSlice.actions;
export default chatSlice.reducer