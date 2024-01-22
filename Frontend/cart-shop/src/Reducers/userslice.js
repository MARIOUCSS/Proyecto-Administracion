import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./authapi";
import { SetHeader } from "./authapi";

const initialState = {
  users: [],
  userLength: 0,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
  deleteStatus: null,
  message: "",
};

export const UpdateUser = createAsyncThunk(
  "Users/UpdateUser",
  async ({ id, name, email, phone, address, answer, rol, password }) => {
    try {
      const { data } = await axios.put(
        `${url}/user/update-user/${id}`,
        {
          name,
          email,
          phone,
          address,
          answer,
          rol,
          password,
        },
        SetHeader()
      );
      return data.message;
    } catch (error) {
      console.log("Error en la acción UpdateCategory:", error);
      throw error; // Lanza el error para que sea capturado por el componente
    }
  }
);
export const GetUsers = createAsyncThunk(
  "Users/GetUsers",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/user/get-user`);
      return data?.users;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const CreateUsers = createAsyncThunk(
  "Users/CreateUsers",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${url}/user/create-user`,
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          password: values.password,
          answer: values.answer,
          rol: values.rol,
        },
        SetHeader()
      );
      return data.message;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
/////
export const Userdelete = createAsyncThunk(
  "category/Userdelete",
  async (id) => {
    try {
      const { data } = await axios.delete(
        `${url}/user/delete-user/${id}`,
        SetHeader()
      );
      return data.message;
    } catch (error) {
      console.log(error);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Update User
    builder.addCase(UpdateUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(UpdateUser.fulfilled, (state, action) => {
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
    builder.addCase(UpdateUser.rejected, (state, action) => {
      return {
        ...state,
        message: "",
        registerStatus: "rejected",
      };
    });
    //Delete User
    builder.addCase(Userdelete.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(Userdelete.fulfilled, (state, action) => {
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
    builder.addCase(Userdelete.rejected, (state, action) => {
      return {
        ...state,
        message: "",
        registerStatus: "rejected",
      };
    });
    //Enter user
    builder.addCase(CreateUsers.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(CreateUsers.fulfilled, (state, action) => {
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
    builder.addCase(CreateUsers.rejected, (state, action) => {
      return {
        ...state,
        message: "",
        registerStatus: "rejected",
      };
    });
    //All User
    builder.addCase(GetUsers.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(GetUsers.fulfilled, (state, action) => {
      if (action.payload) {
        const users = action.payload;
        return {
          ...state,
          users: users,
          userLength: users.length,
          registerStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(GetUsers.rejected, (state, action) => {
      return {
        ...state,
        registerError: action.payload,
        registerStatus: "rejected",
      };
    });
  },
});
export default userSlice.reducer;
