import { combineReducers } from "redux";
import { orderReducer } from "./ApiSlice/orderSlice";
import { ingredientReducer } from "./ApiSlice/ingredientSlice";
import { candyTypeReducer } from "./ApiSlice/candyTypeSlice";
import { assemblyLineReducer } from "./ApiSlice/assemblyLineSlice";
import { addSettingsReducer } from "./ApiSlice/addSettings";
import { notificationReducer } from "./notificationSlice/notificationContext";
import { currAssemblyReducer } from "./currAssembly/currAssemblySlice";

export const rootReducer = combineReducers({
  orders: orderReducer,
  ingredient: ingredientReducer,
  candyType: candyTypeReducer,
  assemblyLine: assemblyLineReducer,
  addSettings: addSettingsReducer,
  notifications : notificationReducer,
  currAssembly: currAssemblyReducer,
});
