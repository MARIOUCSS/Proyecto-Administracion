import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./authapi";

///import jwtDecode from "jwt-decode";
const initialState = {
  token: localStorage.getItem("token"),
  _id: "",
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  answer: "",
  role: 0,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

///User Register
export const RegisterUser = createAsyncThunk(
  "auth/RegisterUser",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/auth/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        address: values.address,
        answer: values.answer,
      });
      return data.user;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
///Login User
export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/auth/login`, {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", data.token);

      return data?.user;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      return {
        ...state,
        token,
      };
    },

    logout(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        _id: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        answer: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
        role: 0,
        //ojo con el role
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = action.payload;
        return {
          ...state,
          name: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone,
          address: user.address,
          answer: user.answer,
          _id: user._id,
          registerStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(RegisterUser.rejected, (state, action) => {
      return {
        ...state,
        registerError: action.payload,
        registerStatus: "rejected",
      };
    });
    ///////////////Login
    builder.addCase(LoginUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      if (action.payload) {
        // const user = jwtDecode(action.payload);
        const user = action.payload;
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user.id,
          phone: user.phone,
          address: user.address,
          answer: user.answer,
          role: user.role,
          registerStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      return {
        ...state,
        registerError: action.payload,
        registerStatus: "rejected",
      };
    });
  },
});

////
export default authSlice.reducer;
export const { logout, loadUser } = authSlice.actions;
