import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./authapi";
import { toast } from "react-toastify";
import Item from "antd/es/list/Item";
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
    RemoveCart(state, action) {
      const { id, name } = action.payload;
      const removecart = state.cartItems.filter((x) => x._id !== id);
      state.cartItems = removecart;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${name} Removido del carrito`, {
        position: "bottom-left",
      });
    },
    Increment(state, action) {
      const indexs = state.cartItems.findIndex(
        (x) => x._id === action.payload.id
      );
      console.log(indexs);
      if (indexs >= 0) {
        state.cartItems[indexs].cuantity += 1;
        toast.info(
          `incrementando la cantidad de ${state.cartItems[indexs].name} `,
          {
            position: "bottom-left",
          }
        );
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    Decrement(state, action) {
      const index = state.cartItems.findIndex(
        (x) => x._id === action.payload.id
      );
      if (state.cartItems[index].cuantity > 1) {
        state.cartItems[index].cuantity -= 1;
        toast.info(`Reducio la cantidad de ${state.cartItems[index].name} `, {
          position: "bottom-left",
        });
      } else if (state.cartItems[index].cuantity === 1) {
        //Si reducimos a de 1 a 0 tiene que eliminarse el objeto par que no quede 0
        const obEliminado = state.cartItems[index]?.name;
        const cartR = state.cartItems.filter(
          (x) => x._id !== action.payload.id
        );

        state.cartItems = cartR;
        toast.error(`${obEliminado} Removido del carrito`, {
          position: "botton-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    ClearCart(state, action) {
      state.cartItems = [];
      toast.error(`Clean Cart`, {
        position: "botton-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    TotalCart(state, action) {
      let { total, cantidad } = state.cartItems.reduce(
        (ac, i) => {
          const { price, cuantity } = i;
          const total = price * cuantity;
          ac["total"] += total;
          ac["cantidad"] += cuantity;
          return ac;
        },
        { total: 0, cantidad: 0 }
      );
      state.carttotalmonto = total;
      state.carttotalcanti = cantidad;
    },
  },
  // extraReducers:(builder)=>{

  // }
});
//acciones
export const {
  AddToCart,
  RemoveCart,
  Increment,
  Decrement,
  ClearCart,
  TotalCart,
} = cartSlice.actions;
//exportar el slice
export default cartSlice.reducer;
