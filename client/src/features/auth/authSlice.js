import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  allAdmins:null,
  isCheckingAuth: true,
  isAllAdminLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuth: (state) => {
      state.isCheckingAuth = false
    },
    setUser: (state,action) => {
      state.user = action.payload;
    },
    setAllAdmins: (state, action) => {
      state.allAdmins = action.payload
    },
    setIsAllAdminLoading : (state,action) => {
      state.isAllAdminLoading = action.payload
    }
  },
});

export const { checkAuth, setUser, setAllAdmins, setIsAllAdminLoading } = authSlice.actions;

export default authSlice.reducer;
