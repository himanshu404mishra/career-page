import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  application: null,
  isApplicationLoading: false,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.application = action.payload;
    },
    setIsApplicationLoading: (state, action) => {
      state.isJobLoading = action.payload;
    }
    
  },
});

export const { setApplications, setIsApplicationLoading } =
  applicationSlice.actions;

export default applicationSlice.reducer;
