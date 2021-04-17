import { configureStore } from "@reduxjs/toolkit";
import topicsReducer from './features/topicsSlice'
import thunk from "redux-thunk";

const store = configureStore({ reducer: topicsReducer, middleware: [thunk] });

export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

export default store;
