import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import {logger} from 'redux-logger'
import { setupListeners } from "@reduxjs/toolkit/query";
import { orderSlice } from "./ApiSlice/orderSlice";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    logger,
    orderSlice.middleware,
  ]),
});

setupListeners(store.dispatch);