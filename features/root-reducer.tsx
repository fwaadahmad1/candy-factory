import { combineReducers } from "redux";
import { orderReducer, orderSlice } from "./ApiSlice/orderSlice";

export const rootReducer = combineReducers({
    orders:orderReducer
});
