import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./authapi";
import { toast } from "react-toastify";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  carttotalcanti: 0,
  carttotalmonto: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart(state, action) {
      //action.payload ={objeto }
      const index = state.cartItems.findIndex(
        (x) => x._id === action.payload._id
      );
      //sale -1 si no hay el valor
      if (index >= 0) {
        state.cartItems[index].cuantity += 1;
        toast.info(
          `incrementando la cantidad de ${state.cartItems[index].name} `,
          {
            position: "bottom-left",
          }
        );
      } else {
        const pro = { ...action.payload, cuantity: 1 };
        state.cartItems.push(pro);
        toast.success(`${action.payload.name} añadido al carrito`, {
          position: "botton-left",
        });
      }
      // state.carttotalcanti = state.cartItems.length;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});
//acciones
export const { AddToCart } = cartSlice.actions;
//exportar el slice
export default cartSlice.reducer;
