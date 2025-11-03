import { createSlice } from "@reduxjs/toolkit";

// Define a User type


// Define the Auth state type
interface AuthState {
  isLogin: boolean;
  user: any | null;
}

// Initial state
const initialState: AuthState = {
  isLogin: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isLogin = false;
      state.user = null;
    },
    refreshUser: (state, action) => {
      state.user = {...state.user,access_token: action.payload};
    },
  },
});

export const { loginUser, logoutUser, refreshUser } = authSlice.actions;
export default authSlice;
