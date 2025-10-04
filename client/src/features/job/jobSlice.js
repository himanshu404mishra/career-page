import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  job: null,
  isJobLoading: false,
  sortedJob: null,
  isJobSorted: false,
  tags: ["view all"],
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJob: (state, action) => {
      state.job = action.payload;
    },
    setJobLoading: (state, action) => {
      state.isJobLoading = action.payload;
    },
    setSorttedJob: (state, action) => {
      let sortedData = state.job.filter((job) =>
        job.tags.includes(action.payload)
      );
      state.sortedJob = sortedData;
    },
    setIsJobSorted: (state, action) => {
      state.isJobSorted = action.payload;
    },
    setTags: (state, action) => {
      const tags = state.tags;
      action.payload.forEach((element) => {
        if (tags.includes(element.toLowerCase())) {
          return;
        }else {
          state.tags = [...tags, element.toLowerCase()];
        }
      });
    },
    
  },
});

export const { setJob, setJobLoading, setSorttedJob, setIsJobSorted, setTags } =
  jobSlice.actions;

export default jobSlice.reducer;
