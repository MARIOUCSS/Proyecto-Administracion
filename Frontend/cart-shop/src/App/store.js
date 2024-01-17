import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/authslice";
import cateReducer, { Getcategories } from "../Reducers/categoryslice";
import userReducer, { GetUsers } from "../Reducers/userslice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: cateReducer,
    user: userReducer,
  },
});
store.dispatch(GetUsers());
store.dispatch(Getcategories());
