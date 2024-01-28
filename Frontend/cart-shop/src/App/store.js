import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/authslice";
import cateReducer, { Getcategories } from "../Reducers/categoryslice";
import userReducer, { GetUsers } from "../Reducers/userslice";
import productReducer, { GetProducts } from "../Reducers/productslice";
import cartshop from "../Reducers/cartShopping";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: cateReducer,
    user: userReducer,
    product: productReducer,
    cartShop: cartshop,
  },
});
store.dispatch(GetUsers());
store.dispatch(Getcategories());
store.dispatch(GetProducts());
