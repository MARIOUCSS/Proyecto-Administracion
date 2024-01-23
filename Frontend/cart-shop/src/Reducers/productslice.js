import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./authapi";
import { SetHeader } from "./authapi";
const initialState = {
  Products: [],
  ProductsLength: 0,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
  deleteStatus: null,
  message: "",
};
export const Productdelete = createAsyncThunk(
  "Product/Productdelete",
  async (id) => {
    try {
      const { data } = await axios.delete(
        `${url}/product/delete-product/${id}`,
        SetHeader()
      );
      return data.message;
    } catch (error) {
      console.log(error);
    }
  }
);
export const GetProducts = createAsyncThunk(
  "Products/GetProducts",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/product/get-product`);
      return data?.Products;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
const Productslice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Delete Product
    builder.addCase(Productdelete.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(Productdelete.fulfilled, (state, action) => {
      if (action.payload) {
        const message = action.payload;
        return {
          ...state,
          message: message,
          registerStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(Productdelete.rejected, (state, action) => {
      return {
        ...state,
        message: "",
        registerStatus: "rejected",
      };
    });
    //All Products
    builder.addCase(GetProducts.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(GetProducts.fulfilled, (state, action) => {
      if (action.payload) {
        const Productsx = action.payload;
        return {
          ...state,
          Products: Productsx,
          userLength: Productsx.length,
          registerStatus: "Success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(GetProducts.rejected, (state, action) => {
      return {
        ...state,
        registerError: action.payload,
        registerStatus: "rejected",
      };
    });
  },
});
export default Productslice.reducer;
