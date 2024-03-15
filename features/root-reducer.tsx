import { combineReducers } from "redux";
import { orderReducer } from "./ApiSlice/orderSlice";
import { ingredientReducer } from "./ApiSlice/ingredientSlice";
import { candyTypeReducer } from "./ApiSlice/candyTypeSlice";

export const rootReducer = combineReducers({
    orders:orderReducer,
    ingredient:ingredientReducer,
    candyType : candyTypeReducer,
});
