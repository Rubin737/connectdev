import { configureStore } from "@reduxjs/toolkit";
import  themeReducer from './themeSlice'

export const themeStrore = configureStore({
    reducer:{
        theme:themeReducer
    }
})