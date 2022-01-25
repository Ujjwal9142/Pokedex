import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import { typeReducer } from "./typeReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  type: typeReducer,
});
