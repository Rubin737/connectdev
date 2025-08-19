import { configureStore } from "@reduxjs/toolkit";
import  themeReducer from './themeSlice'
import menuReducer from './menuSlice'

export const themeStrore = configureStore({
    reducer:{
        theme:themeReducer,
        sidebar:menuReducer
    }
})
