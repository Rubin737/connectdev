import { configureStore } from "@reduxjs/toolkit";
import  themeReducer from './themeSlice'
import menuReducer from './menuSlice'
import chatReducer from './chatSlice'

export const themeStrore = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: menuReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["chat.client", "chat.channel"],
        ignoredActions: ["chat/addClient", "chat/addChannel"],
      },
    }),
});
