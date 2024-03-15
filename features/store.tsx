import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import {logger} from 'redux-logger'
import { setupListeners } from "@reduxjs/toolkit/query";
import { orderSlice } from "./ApiSlice/orderSlice";
import { ingredientSlice } from "./ApiSlice/ingredientSlice";
import { candyTypeSlice } from "./ApiSlice/candyTypeSlice";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    logger,
    orderSlice.middleware,
    ingredientSlice.middleware,
    candyTypeSlice.middleware,
  ]),
});

setupListeners(store.dispatch);