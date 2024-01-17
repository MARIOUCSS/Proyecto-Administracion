import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./authapi";
import { SetHeader } from "./authapi";
const initialState = {
  categories: [],
  categoriesLength: 0,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
  deleteStatus: null,
  message: "",
};
export const UpdateCategory = createAsyncThunk(
  "category/UpdateCategory",
  async ({ id, names, slug }) => {
    try {
      const { data } = await axios.put(
        `${url}/category/update-category/${id}`,
        { names, slug }, // Aquí envías names y slug directamente
        SetHeader()
      );
      return data.message;
    } catch (error) {
      console.log("Error en la acción UpdateCategory:", error);
      throw error; // Lanza el error para que sea capturado por el componente
    }
  }
);

////
export const CreateCategorys = createAsyncThunk(
  "category/CreateCategory",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${url}/category/create-category`,
        { name: values.name },
        SetHeader()
      );
      return data.category;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const Getcategories = createAsyncThunk(
  "category/Getcategories",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/category/get-category`);
      return data.category;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const Categorydelete = createAsyncThunk(
  "category/Categorydelete",
  async (id) => {
    try {
      const { data } = await axios.delete(
        `${url}/category/delete-category/${id}`,
        SetHeader()
      );
      return data.message;
    } catch (error) {
      console.log(error);
    }
  }
);
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(UpdateCategory.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(UpdateCategory.fulfilled, (state, action) => {
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
    builder.addCase(UpdateCategory.rejected, (state, action) => {
      return {
        ...state,
        message: "",
        registerStatus: "rejected",
      };
    });
    //
    builder.addCase(CreateCategorys.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(CreateCategorys.fulfilled, (state, action) => {
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
    builder.addCase(CreateCategorys.rejected, (state, action) => {
      return {
        ...state,
        message: "",
        registerStatus: "rejected",
      };
    });
    builder.addCase(Categorydelete.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(Categorydelete.fulfilled, (state, action) => {
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
    builder.addCase(Categorydelete.rejected, (state, action) => {
      return {
        ...state,
        message: "",
        registerStatus: "rejected",
      };
    });
    /////////////////////////////////////
    builder.addCase(Getcategories.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(Getcategories.fulfilled, (state, action) => {
      if (action.payload) {
        const cate = action.payload;
        return {
          ...state,
          categories: cate,
          categoriesLength: cate.length,
          registerStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(Getcategories.rejected, (state, action) => {
      return {
        ...state,
        registerError: action.payload,
        registerStatus: "rejected",
      };
    });
  },
});

export default categorySlice.reducer;
