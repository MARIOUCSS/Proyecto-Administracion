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
  SingleProduct: {},
  ProductsRelated: [],
};
export const ProductRelated = createAsyncThunk(
  "Product/ProductRelated",
  async ({ pid, cid }) => {
    try {
      const { data } = await axios.get(
        `${url}/product/related-product/${pid}/${cid}`
      );
      return data?.products;
    } catch (error) {
      console.log(error);
    }
  }
);
export const SingleProduc = createAsyncThunk(
  "Product/SingleProduc",
  async (slug) => {
    try {
      const { data } = await axios.get(`${url}/product/get-product/${slug}`);
      return data?.Product;
    } catch (error) {
      console.log(error);
    }
  }
);
export const CreateProduct = createAsyncThunk(
  "Product/CreateProduct",
  async (pro) => {
    try {
      const formData = new FormData();
      formData.append("name", pro.name);
      formData.append("description", pro.description);
      formData.append("price", pro.price);
      formData.append("category", pro.categoryId);
      formData.append("quantity", pro.quantity);
      formData.append("shipping", pro.shipping);
      formData.append("photo", pro.photo);

      const { data } = await axios.post(
        `${url}/product/create-product`,
        formData,
        SetHeader()
      );

      return data.message;
    } catch (error) {
      console.error("Error al crear el producto:", error);
      return rejectWithValue(error.response?.data || "Error desconocido");
    }
  }
);
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
export const Productslice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Related-Product
    builder.addCase(ProductRelated.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(ProductRelated.fulfilled, (state, action) => {
      if (action.payload) {
        const products = action.payload;
        return {
          ...state,
          ProductsRelated: products,
          registerStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(ProductRelated.rejected, (state, action) => {
      return {
        ...state,
        message: "",
        registerStatus: "rejected",
      };
    });
    //Single-Product
    builder.addCase(SingleProduc.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(SingleProduc.fulfilled, (state, action) => {
      if (action.payload) {
        const product = action.payload;
        return {
          ...state,
          SingleProduct: product,
          registerStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(SingleProduc.rejected, (state, action) => {
      return {
        ...state,
        message: "",
        registerStatus: "rejected",
      };
    });
    //Create Product
    builder.addCase(CreateProduct.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(CreateProduct.fulfilled, (state, action) => {
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
    builder.addCase(CreateProduct.rejected, (state, action) => {
      return {
        ...state,
        message: "",
        registerStatus: "rejected",
      };
    });
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
