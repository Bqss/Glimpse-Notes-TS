import { configureStore } from "@reduxjs/toolkit";
import noteApi from "./api/noteApi";
import {tagApi} from "./api/tagApi";
import appSlice from "./features/appSlice";
import modalSlice from "./features/modalSlice";


export default configureStore({
  reducer : {
    modal : modalSlice,
    [noteApi.reducerPath] : noteApi.reducer,
    [tagApi.reducerPath] : tagApi.reducer,
    app : appSlice
  },
  middleware: (getDefaultMiddleware) =>[...getDefaultMiddleware(), noteApi.middleware, tagApi.middleware],
})


